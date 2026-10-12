/**
 * Pinned versions for every code sample and the live demo. Exact pins only:
 * caret ranges and `@latest` resolve differently over time.
 */
import { findElement } from '$lib/data/elements';

export const ITEM_PLAYER_PACKAGE = '@pie-players/pie-item-player';
/** All lockstep @pie-players/* packages release together under this version. */
export const ITEM_PLAYER_VERSION = '0.3.75';
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
