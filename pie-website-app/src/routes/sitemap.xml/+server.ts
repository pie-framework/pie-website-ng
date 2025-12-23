export const prerender = true;

export async function GET() {
	const pages = [
		'',
		'/elements',
		'/docs',
		'/docs/getting-started',
		'/docs/core-concepts',
		'/docs/player',
		'/docs/author',
		'/community',
		'/community/contributing',
		'/community/roadmap',
		'/community/changelog',
		'/playground',
		'/about',
		'/about/renaissance',
		'/about/security',
		'/ecosystem',
		'/blog',
		'/compare'
	];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
	.map(
		(page) => `  <url>
    <loc>https://pie.org${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page === '' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
}
