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
					style: `min-height: ${height}`,
					role: 'textbox',
					tabindex: '0',
					'aria-label': `${readonly ? 'Read-only ' : ''}${language} code editor`,
					'aria-multiline': 'true',
					'aria-readonly': readonly ? 'true' : 'false'
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
		--code-string: #2f5d32;
		--code-number: #6936a0;
		--code-literal: #9d2c5c;
		--code-attr: #175e81;
		--code-keyword: #5c3b91;
		background: var(--color-base-200);
		color: var(--color-base-content);
		border: 1px solid var(--site-control-border);
		border-radius: 0.5rem;
		overflow: auto;
	}
	:global([data-theme='dark']) .code-editor {
		--code-string: #b5d58c;
		--code-number: #d2acf0;
		--code-literal: #efa7c7;
		--code-attr: #94cde4;
		--code-keyword: #cfb8f2;
	}
	:global(.code-editor-content) {
		padding: 1rem;
		font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, 'DejaVu Sans Mono', monospace;
		font-size: 0.875rem;
		line-height: 1.5;
		color: var(--color-base-content);
	}
	:global(.code-editor-content pre) { margin: 0; padding: 0; background: transparent; border: none; }
	:global(.code-editor-content code) { background: transparent; padding: 0; color: inherit; font-size: inherit; font-family: inherit; }
	:global(.code-editor-content .hljs-string) { color: var(--code-string); }
	:global(.code-editor-content .hljs-number) { color: var(--code-number); }
	:global(.code-editor-content .hljs-literal) { color: var(--code-literal); }
	:global(.code-editor-content .hljs-attr) { color: var(--code-attr); }
	:global(.code-editor-content .hljs-punctuation) { color: var(--site-muted); }
	:global(.code-editor-content .hljs-keyword) { color: var(--code-keyword); font-weight: 600; }
	:global(.code-editor-content:focus-visible) { outline: 3px solid var(--color-primary); outline-offset: -3px; }
</style>
