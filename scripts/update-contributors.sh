#!/usr/bin/env bash
#
# Fetches contributor data from all public pie-framework repos via the gh CLI,
# aggregates across repos, filters bots and low-contribution users, determines
# active vs alumni status, and writes the result to a static JSON file that the
# website imports directly.
#
# Usage:  ./scripts/update-contributors.sh
# Requires: gh (authenticated), jq

set -euo pipefail

ORG="pie-framework"
MIN_CONTRIBUTIONS=20
RECENCY_MONTHS=12
OUT_FILE="packages/pie-website-app/src/lib/data/contributors.json"

# Ensure we're in the repo root
cd "$(git rev-parse --show-toplevel)"

command -v gh >/dev/null 2>&1 || { echo "Error: gh CLI not found"; exit 1; }
command -v jq >/dev/null 2>&1 || { echo "Error: jq not found"; exit 1; }

echo "Fetching public repos for ${ORG}..."
repos=$(gh api --paginate "/orgs/${ORG}/repos?type=public&per_page=100" \
  --jq '.[] | select(.fork == false and .archived == false) | .name')

repo_count=$(echo "$repos" | wc -l | tr -d ' ')
echo "Found ${repo_count} non-fork, non-archived repos"

# Temp files for aggregation
tmp_dir=$(mktemp -d)
trap 'rm -rf "$tmp_dir"' EXIT

contributors_file="$tmp_dir/contributors.jsonl"
> "$contributors_file"

# Fetch contributors for each repo
i=0
for repo in $repos; do
  i=$((i + 1))
  echo "  [${i}/${repo_count}] ${repo}..."
  gh api --paginate "/repos/${ORG}/${repo}/contributors?per_page=100" \
    --jq ".[] | select(.type != \"Bot\") | {login: .login, avatar_url: .avatar_url, html_url: .html_url, contributions: .contributions, repo: \"${repo}\"}" \
    >> "$contributors_file" 2>/dev/null || true
done

echo ""
echo "Aggregating contributors..."

# Aggregate: sum contributions per user, collect repos
aggregated_file="$tmp_dir/aggregated.json"
jq -s '
  group_by(.login)
  | map({
      username: .[0].login,
      avatarUrl: (.[0].avatar_url + "&s=128"),
      profileUrl: .[0].html_url,
      contributions: (map(.contributions) | add),
      repos: (map(.repo) | unique)
    })
  | map(select(
      .contributions >= '"${MIN_CONTRIBUTIONS}"'
      and (.username | test("\\[bot\\]|dependabot|renovate|github-actions|greenkeeper|snyk-bot|semantic-release-bot") | not)
    ))
  | sort_by(-.contributions)
' "$contributors_file" > "$aggregated_file"

total=$(jq 'length' "$aggregated_file")
echo "Found ${total} contributors with >= ${MIN_CONTRIBUTIONS} contributions"

# Determine recency: check for recent commits
since_date=$(date -v-${RECENCY_MONTHS}m -u +%Y-%m-%dT%H:%M:%SZ 2>/dev/null \
  || date -u -d "${RECENCY_MONTHS} months ago" +%Y-%m-%dT%H:%M:%SZ)

echo "Checking recency (commits since ${since_date})..."

recent_authors_file="$tmp_dir/recent_authors.txt"
> "$recent_authors_file"

# Get repos that were pushed to recently
recent_repos=$(gh api --paginate "/orgs/${ORG}/repos?type=public&per_page=100" \
  --jq ".[] | select(.fork == false and .archived == false and .pushed_at >= \"${since_date}\") | .name")

for repo in $recent_repos; do
  gh api "/repos/${ORG}/${repo}/commits?since=${since_date}&per_page=100" \
    --jq '.[].author.login // empty' \
    >> "$recent_authors_file" 2>/dev/null || true
done

# Unique recent authors
sort -u "$recent_authors_file" > "$tmp_dir/recent_unique.txt"

echo "Found $(wc -l < "$tmp_dir/recent_unique.txt" | tr -d ' ') unique recent authors"

# Split into active and alumni
recent_json=$(jq -R -s 'split("\n") | map(select(length > 0))' "$tmp_dir/recent_unique.txt")

result_file="$tmp_dir/result.json"
jq --argjson recent "$recent_json" '{
  active: [.[] | select(.username as $u | $recent | index($u) != null)],
  alumni: [.[] | select(.username as $u | $recent | index($u) == null)],
  generatedAt: (now | todate)
}' "$aggregated_file" > "$result_file"

# Write output
mkdir -p "$(dirname "$OUT_FILE")"
cp "$result_file" "$OUT_FILE"

active_count=$(jq '.active | length' "$OUT_FILE")
alumni_count=$(jq '.alumni | length' "$OUT_FILE")

echo ""
echo "Written to ${OUT_FILE}:"
echo "  Active: ${active_count}"
echo "  Alumni: ${alumni_count}"
echo "  Generated: $(jq -r '.generatedAt' "$OUT_FILE")"
