/** Local-only audit copy of the static build. No audit code enters production. */
import { resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const build = resolve(import.meta.dir, '../packages/pie-website-app/build');
const axe = Bun.file(fileURLToPath(import.meta.resolve('axe-core/axe.min.js')));
const toolbar = String.raw`
const host = document.createElement('div');
host.id = 'pie-a11y-audit';
const root = host.attachShadow({mode: 'open'});
root.innerHTML = '<style>:host{display:flex;flex-wrap:wrap;max-width:calc(100vw - 24px);position:fixed;bottom:12px;right:12px;z-index:2147483647;font:14px system-ui;color:#222}button{font:inherit;padding:10px 16px;cursor:pointer;background:white;color:#222;border:2px solid #444;border-radius:4px}dialog{position:fixed;inset:20px;max-width:calc(100vw - 40px);max-height:calc(100vh - 40px);overflow:auto;background:white;color:#222;border:2px solid #444}pre{white-space:pre-wrap;overflow-wrap:anywhere}button:focus-visible{outline:3px solid #b63718;outline-offset:3px}</style><button id="text-size" type="button" aria-pressed="false">200% text</button><button id="spacing" type="button" aria-pressed="false">Text spacing</button><button id="run" type="button">Run WCAG audit</button><dialog aria-label="Accessibility audit results"><h2>Audit complete</h2><p id="summary" role="status"></p><button id="close" type="button">Close audit results</button><pre data-testid="a11y-results"></pre></dialog>';
document.body.append(host);
const button = root.querySelector('#run');
const dialog = root.querySelector('dialog');
root.querySelector('#close').onclick = () => dialog.close();
const spacing = document.createElement('style');
document.head.append(spacing);
root.querySelector('#spacing').onclick = event => {
  const enabled = event.currentTarget.getAttribute('aria-pressed') !== 'true';
  event.currentTarget.setAttribute('aria-pressed', String(enabled));
  spacing.textContent = enabled ? '*{line-height:1.5!important;letter-spacing:.12em!important;word-spacing:.16em!important}p{margin-bottom:2em!important}' : '';
};
let textSizes = [];
root.querySelector('#text-size').onclick = event => {
  const enabled = event.currentTarget.getAttribute('aria-pressed') !== 'true';
  event.currentTarget.setAttribute('aria-pressed', String(enabled));
  if (enabled) {
    const elements = [];
    const visit = scope => { for (const element of scope.querySelectorAll('*')) { if(element === host) continue; elements.push(element); if(element.shadowRoot) visit(element.shadowRoot); } };
    visit(document);
    textSizes = elements.map(element => [element, element.style.fontSize, parseFloat(getComputedStyle(element).fontSize)]);
    for (const [element, original, size] of textSizes) element.style.fontSize = (size * 2) + 'px';
  } else {
    for (const [element, original] of textSizes) element.style.fontSize = original;
    textSizes = [];
  }
};
button.onclick = async () => {
  button.disabled = true;
  button.textContent = 'Auditing…';
  host.style.visibility = 'hidden';
  try {
    await document.fonts.ready;
    await Promise.allSettled(document.getAnimations().filter(animation => animation.effect?.getComputedTiming().iterations !== Infinity).map(animation => animation.finished));
    const result = await axe.run({exclude: [['#pie-a11y-audit']]}, {
      runOnly: {type:'tag', values:['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa','best-practice']},
      resultTypes: ['violations','incomplete']
    });
    const rules = list => list.map(({id,impact,description,helpUrl,tags,nodes}) => ({id,impact,description,helpUrl,tags,nodes:nodes.map(({target,html,failureSummary,any,all,none}) => ({target,html,failureSummary,checks:[...any,...all,...none].map(({id,message,data}) => ({id,message,data}))}))}));
    const report = {url:location.href,title:document.title,theme:document.documentElement.dataset.theme,viewport:{width:innerWidth,height:innerHeight},axeVersion:result.testEngine.version,violations:rules(result.violations),incomplete:rules(result.incomplete),passedRules:result.passes.length};
    root.querySelector('[data-testid="a11y-results"]').textContent = JSON.stringify(report, null, 2);
    root.querySelector('#summary').textContent = report.violations.length + ' failing rules; ' + report.incomplete.length + ' rules need manual review; ' + report.passedRules + ' passed.';
  } catch (error) {
    root.querySelector('[data-testid="a11y-results"]').textContent = JSON.stringify({error:String(error)});
    root.querySelector('#summary').textContent = 'Audit failed';
  } finally {
    host.style.visibility = '';
    button.disabled = false;
    button.textContent = 'Run WCAG audit';
    dialog.showModal();
  }
};
`;

const server = Bun.serve({
  hostname: '127.0.0.1',
  port: Number(process.env.A11Y_PORT || 0),
  async fetch(request) {
    const path = new URL(request.url).pathname;
    if (path === '/__a11y/axe.min.js') return new Response(axe, {headers: {'Content-Type':'text/javascript'}});
    if (path === '/__a11y/toolbar.js') return new Response(toolbar, {headers: {'Content-Type':'text/javascript'}});
    let filename: string;
    try { filename = resolve(build, '.' + decodeURIComponent(path)); }
    catch { return new Response('Bad path', {status:400}); }
    if (filename !== build && !filename.startsWith(build + sep)) return new Response('Not found', {status:404});
    if (!/\.[^/]+$/.test(filename)) filename = resolve(filename, 'index.html');
    let file = Bun.file(filename);
    if (!await file.exists()) return new Response('Not found', {status:404});
    if (filename.endsWith('.html')) {
      return new Response((await file.text()).replace('</body>', '<script src="/__a11y/axe.min.js"></script><script src="/__a11y/toolbar.js"></script></body>'), {headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'}});
    }
    return new Response(file);
  }
});
console.log(`Accessibility audit: ${server.url} (build with bun run build first)`);
