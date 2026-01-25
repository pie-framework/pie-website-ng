<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight';
	import { common, createLowlight } from 'lowlight';

	interface Props {
		value: string;
		language?: string;
		readonly?: boolean;
		onChange?: (value: string) => void;
		height?: string;
	}

	let {
		value = '',
		language = 'json',
		readonly = false,
		onChange,
		height = '400px'
	}: Props = $props();

	let editor: Editor | null = null;
	let editorElement: HTMLElement;
	let isProgrammaticUpdate = false;

	const lowlight = createLowlight(common);

	// HTML escape function to prevent angle brackets from being parsed as HTML
	function escapeHtml(text: string): string {
		const div = document.createElement('div');
		div.textContent = text;
		return div.innerHTML;
	}

	onMount(() => {
		if (!editorElement) return;

		editor = new Editor({
			element: editorElement,
			extensions: [
				StarterKit.configure({
					codeBlock: false
				}),
				CodeBlockLowlight.configure({
					lowlight,
					defaultLanguage: language
				})
			],
			content: `<pre><code class="language-${language}">${escapeHtml(value)}</code></pre>`,
			editable: !readonly,
			editorProps: {
				attributes: {
					class: 'code-editor-content',
					style: `min-height: ${height}`
				}
			},
			onUpdate: ({ editor }) => {
				if (isProgrammaticUpdate) {
					isProgrammaticUpdate = false;
					return;
				}

				const codeBlock = editor.state.doc.firstChild;
				if (codeBlock && codeBlock.type.name === 'codeBlock') {
					const text = codeBlock.textContent;
					onChange?.(text);
				}
			}
		});
	});

	onDestroy(() => {
		editor?.destroy();
	});

	// Update content when value prop changes
	$effect(() => {
		if (editor && value !== undefined && !editor.isFocused) {
			isProgrammaticUpdate = true;
			editor.commands.setContent(
				`<pre><code class="language-${language}">${escapeHtml(value)}</code></pre>`
			);
		}
	});

	// Update editable state
	$effect(() => {
		if (editor) {
			editor.setEditable(!readonly);
		}
	});
</script>

<div class="code-editor" bind:this={editorElement}></div>

<style>
	.code-editor {
		background: oklch(var(--b2));
		border: 2px solid #d1d5db !important;
		border-radius: 0.5rem;
		overflow: auto;
		box-shadow: 0 2px 8px oklch(var(--bc) / 0.15);
	}

	/* Ensure border is visible in light mode */
	:global([data-theme='light']) .code-editor,
	:global(:root:not([data-theme='dark'])) .code-editor {
		border-color: #d1d5db !important;
		background: #f9fafb !important;
	}

	/* Dark mode border */
	:global([data-theme='dark']) .code-editor {
		border-color: #4b5563 !important;
		background: #1f2937 !important;
	}

	:global(.code-editor-content) {
		padding: 1rem;
		font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, 'DejaVu Sans Mono',
			monospace;
		font-size: 0.875rem;
		line-height: 1.5;
		color: oklch(var(--bc));
		outline: none;
	}

	:global(.code-editor-content pre) {
		margin: 0;
		padding: 0;
		background: transparent;
		border: none;
	}

	:global(.code-editor-content code) {
		background: transparent;
		padding: 0;
		color: inherit;
		font-size: inherit;
		font-family: inherit;
	}

	/* Syntax highlighting using DaisyUI theme colors */
	:global(.code-editor-content .hljs-string) {
		color: hsl(80deg 60% 50%);
	}

	:global(.code-editor-content .hljs-number) {
		color: hsl(280deg 60% 60%);
	}

	:global(.code-editor-content .hljs-literal) {
		color: hsl(340deg 60% 60%);
	}

	:global(.code-editor-content .hljs-attr) {
		color: hsl(200deg 60% 55%);
	}

	:global(.code-editor-content .hljs-punctuation) {
		color: oklch(var(--bc) / 0.6);
	}

	:global(.code-editor-content .hljs-keyword) {
		color: hsl(260deg 60% 60%);
		font-weight: 600;
	}

	/* Focus state */
	:global(.code-editor-content:focus) {
		outline: 2px solid oklch(var(--p));
		outline-offset: -2px;
	}

	/* Dark theme adjustments */
	:global([data-theme='dark'] .code-editor-content .hljs-string) {
		color: hsl(80deg 50% 60%);
	}

	:global([data-theme='dark'] .code-editor-content .hljs-number) {
		color: hsl(280deg 50% 70%);
	}

	:global([data-theme='dark'] .code-editor-content .hljs-literal) {
		color: hsl(340deg 50% 70%);
	}

	:global([data-theme='dark'] .code-editor-content .hljs-attr) {
		color: hsl(200deg 50% 65%);
	}

	:global([data-theme='dark'] .code-editor-content .hljs-keyword) {
		color: hsl(260deg 50% 70%);
	}
</style>
