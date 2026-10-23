/** Give overflowing examples a keyboard scroll target, including after reflow. */
export function accessibleScrollRegions(root: HTMLElement) {
	const managed = new Map<HTMLElement, { role: string | null; label: string | null }>();
	const observed = new Set<HTMLElement>();
	let frame = 0;
	const resize = new ResizeObserver(schedule);
	function scan() {
		frame = 0;
		const candidates = new Set(root.querySelectorAll<HTMLElement>('pre, .guide-table, .overflow-x-auto'));
		for (const element of observed) {
			if (!candidates.has(element)) { resize.unobserve(element); observed.delete(element); managed.delete(element); }
		}
		for (const [index, element] of [...candidates].entries()) {
			if (!observed.has(element)) { resize.observe(element); observed.add(element); }
			// Editable and read-only editor surfaces already own their focus behavior.
			if (element.closest('.code-editor, [contenteditable="true"]')) continue;
			const scrolls = element.clientWidth > 0 && (element.scrollWidth > element.clientWidth + 1 || element.scrollHeight > element.clientHeight + 1);
			if (scrolls && !element.hasAttribute('tabindex') && !element.querySelector('a[href], button, input, select, textarea, [tabindex="0"]')) {
				managed.set(element, { role: element.getAttribute('role'), label: element.getAttribute('aria-label') });
				element.tabIndex = 0;
				element.setAttribute('role', 'group');
				element.setAttribute('aria-label', (element.querySelector('table') ? 'Scrollable table ' : 'Scrollable code example ') + (index + 1));
			} else if (!scrolls && managed.has(element)) {
				const original = managed.get(element)!;
				element.removeAttribute('tabindex');
				for (const [name, value] of [['role', original.role], ['aria-label', original.label]]) {
					if (value === null) element.removeAttribute(name!); else element.setAttribute(name!, value!);
				}
				managed.delete(element);
			}
		}
	}
	function schedule() { if (!frame) frame = requestAnimationFrame(scan); }
	const mutations = new MutationObserver(schedule);
	mutations.observe(root, { childList: true, subtree: true, characterData: true });
	root.addEventListener('toggle', schedule, true);
	schedule();
	return { destroy() {
		cancelAnimationFrame(frame);
		resize.disconnect();
		mutations.disconnect();
		root.removeEventListener('toggle', schedule, true);
	} };
}
