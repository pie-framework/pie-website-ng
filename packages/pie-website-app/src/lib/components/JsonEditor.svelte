<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	export let value: string = '';
	export let onChange: (newValue: string) => void = () => {};
	export let height: string = '600px';

	let editorContainer: HTMLDivElement;
	let editor: any;
	let monaco: any;

	onMount(async () => {
		try {
			// Dynamically import Monaco
			monaco = await import('monaco-editor');

			// Configure JSON language
			monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
				validate: true,
				allowComments: false,
				schemas: []
			});

			// Create editor
			editor = monaco.editor.create(editorContainer, {
				value: value,
				language: 'json',
				theme: 'vs-dark',
				automaticLayout: true,
				minimap: { enabled: false },
				scrollBeyondLastLine: false,
				fontSize: 14,
				formatOnPaste: true,
				formatOnType: true,
				tabSize: 2,
				wordWrap: 'on'
			});

			// Listen for changes
			editor.onDidChangeModelContent(() => {
				onChange(editor.getValue());
			});
		} catch (error) {
			console.error('Failed to load Monaco Editor:', error);
		}
	});

	onDestroy(() => {
		if (editor) {
			editor.dispose();
		}
	});

	// Update editor when value prop changes externally
	$: if (editor && editor.getValue() !== value) {
		const position = editor.getPosition();
		editor.setValue(value);
		if (position) {
			editor.setPosition(position);
		}
	}
</script>

<div bind:this={editorContainer} class="json-editor" style="height: {height}; width: 100%;"></div>

<style>
	.json-editor {
		border: 1px solid var(--fallback-bc, oklch(var(--bc) / 0.2));
		border-radius: 0.5rem;
		overflow: hidden;
	}
</style>
