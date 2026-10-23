/**
 * Pinned versions for every code sample and the live demo. Exact pins only:
 * caret ranges and `@latest` resolve differently over time.
 */
import { findElement } from '$lib/data/elements';
import packageJson from '../../package.json';

/** All lockstep @pie-players/* packages release together under this version. */
export const ITEM_PLAYER_VERSION = packageJson.dependencies['@pie-players/pie-theme'];

/** Self-contained browser build, on the same lockstep version as the item player. */
export const SECTION_PLAYER_CDN_URL = 'https://cdn.jsdelivr.net/npm/@pie-players/pie-section-player@' + ITEM_PLAYER_VERSION + '/dist/browser/pie-section-player.js';
export const CALCULATOR_CDN_URL = 'https://cdn.jsdelivr.net/npm/@pie-players/pie-calculator-cortex@' + ITEM_PLAYER_VERSION + '/dist/index.js';

export const ITEM_PLAYER_PACKAGE = '@pie-players/pie-item-player';

export const ITEM_PLAYER_CDN_URL = `https://cdn.jsdelivr.net/npm/${ITEM_PLAYER_PACKAGE}@${ITEM_PLAYER_VERSION}/dist/pie-item-player.js`;

/** The exact published version of an element, e.g. `14.0.4` for multiple-choice. */
export function elementVersion(name: string): string {
	return findElement(name).version;
}

/** The value an item config's `elements` map takes, e.g. `@pie-element/multiple-choice@14.0.4`. */
export function elementSpec(name: string): string {
	const element = findElement(name);
	return `${element.package}@${element.version}`;
}
