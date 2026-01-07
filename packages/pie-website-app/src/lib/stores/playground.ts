/**
 * Playground store - manages PIE item state in browser localStorage
 */

import { writable } from 'svelte/store';
import { browser } from '$app/environment';

interface PlaygroundState {
	currentItem: any;
	savedItems: Array<{ id: string; name: string; item: any }>;
	mode: 'gather' | 'view' | 'evaluate';
	role: 'student' | 'instructor';
}

const defaultItem = {
	elements: { 'pp-pie-element-multiple-choice': '@pie-element/multiple-choice@latest' },
	models: [
		{
			id: '1',
			element: 'pp-pie-element-multiple-choice',
			prompt: '<div><strong>What is the capital of France?</strong></div>',
			choiceMode: 'radio',
			choices: [
				{ label: 'London', value: 'london' },
				{ label: 'Berlin', value: 'berlin' },
				{ label: 'Paris', value: 'paris' },
				{ label: 'Madrid', value: 'madrid' }
			],
			correctResponse: { value: 'paris' }
		}
	],
	markup: "<pp-pie-element-multiple-choice id='1'></pp-pie-element-multiple-choice>"
};

const STORAGE_KEY = 'pie-playground-state';

// Load initial state from localStorage
function loadState(): PlaygroundState {
	if (!browser) {
		return {
			currentItem: defaultItem,
			savedItems: [],
			mode: 'gather',
			role: 'student'
		};
	}

	try {
		const saved = localStorage.getItem(STORAGE_KEY);
		if (saved) {
			const parsed = JSON.parse(saved);
			return {
				...parsed,
				currentItem: parsed.currentItem || defaultItem
			};
		}
	} catch (e) {
		console.error('Failed to load playground state:', e);
	}

	return {
		currentItem: defaultItem,
		savedItems: [],
		mode: 'gather',
		role: 'student'
	};
}

// Save state to localStorage
function saveState(state: PlaygroundState) {
	if (!browser) return;

	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
	} catch (e) {
		console.error('Failed to save playground state:', e);
	}
}

function createPlaygroundStore() {
	const { subscribe, set, update } = writable<PlaygroundState>(loadState());

	// Auto-save on changes
	if (browser) {
		subscribe((state) => {
			saveState(state);
		});
	}

	return {
		subscribe,
		setCurrentItem: (item: any) =>
			update((state) => ({
				...state,
				currentItem: item
			})),
		saveItem: (name: string) =>
			update((state) => {
				const id = Date.now().toString();
				return {
					...state,
					savedItems: [
						...state.savedItems,
						{
							id,
							name,
							item: JSON.parse(JSON.stringify(state.currentItem))
						}
					]
				};
			}),
		loadItem: (id: string) =>
			update((state) => {
				const saved = state.savedItems.find((s) => s.id === id);
				if (saved) {
					return {
						...state,
						currentItem: JSON.parse(JSON.stringify(saved.item))
					};
				}
				return state;
			}),
		deleteItem: (id: string) =>
			update((state) => ({
				...state,
				savedItems: state.savedItems.filter((s) => s.id !== id)
			})),
		setMode: (mode: 'gather' | 'view' | 'evaluate') =>
			update((state) => ({
				...state,
				mode
			})),
		setRole: (role: 'student' | 'instructor') =>
			update((state) => ({
				...state,
				role
			})),
		reset: () =>
			set({
				currentItem: defaultItem,
				savedItems: [],
				mode: 'gather',
				role: 'student'
			}),
		loadSample: (sample: any) =>
			update((state) => ({
				...state,
				currentItem: sample
			}))
	};
}

export const playground = createPlaygroundStore();
