import { CALCULATOR_CDN_URL, SECTION_PLAYER_CDN_URL } from '$lib/versions';

interface SectionModule {
	createPackagedToolRegistry(options?: Record<string, unknown>): unknown;
	createCalculatorToolRegistration(options: Record<string, unknown>): unknown;
}
let modulePromise: Promise<SectionModule> | undefined;

export function loadSectionRuntime(): Promise<SectionModule> {
	if (!modulePromise) {
		modulePromise = Promise.all([
			import(/* @vite-ignore */ SECTION_PLAYER_CDN_URL),
			// The theme tool applies a scheme to a registered <pie-theme> host.
			import('@pie-players/pie-theme')
		]).then(([module]) => module).catch((error) => {
			modulePromise = undefined;
			throw error;
		});
	}
	return modulePromise;
}

export function demoToolRegistry(module: SectionModule) {
	return module.createPackagedToolRegistry({
		overrides: {
			calculator: module.createCalculatorToolRegistration({
				providers: {
					'calculator-cortex': {
						providerName: 'PIE Open-Source Calculator',
						version: '1', requiresAuth: false, backend: 'cortex',
						load: async () => (await import(/* @vite-ignore */ CALCULATOR_CDN_URL)).CortexCalculatorProvider,
						initializationErrorMessage: 'The demo calculator could not be loaded.'
					}
				}
			})
		}
	});
}

export interface DemoController {
	getSession?(): unknown;
	persist?(): Promise<void>;
}
export interface DemoSectionElement extends HTMLElement {
	runtime?: Record<string, unknown>;
	section?: unknown;
	session?: unknown;
	assessment?: unknown;
	toolRegistry?: unknown;
	getSectionController?(): DemoController | null;
}
