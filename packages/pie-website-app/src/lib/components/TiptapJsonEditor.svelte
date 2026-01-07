<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
	import { common, createLowlight } from 'lowlight';

	export let value: string = '';
	export let onChange: (newValue: string) => void = () => {};
	export let height: string = '600px';

	let editorElement: HTMLDivElement;
	let editor: Editor | null = null;

	// Create lowlight instance for syntax highlighting
	const lowlight = createLowlight(common);

	onMount(() => {
		editor = new Editor({
			element: editorElement,
			extensions: [
				StarterKit.configure({
					codeBlock: false // Disable default code block
				}),
				CodeBlockLowlight.configure({
					lowlight,
					defaultLanguage: 'json'
				})
			],
			content: `<pre><code class="language-json">${escapeHtml(value)}</code></pre>`,
			editorProps: {
				attributes: {
					class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none min-h-full p-4',
					style: `min-height: ${height};`
				}
			},
			onUpdate: ({ editor }) => {
				// Extract JSON from code block
				const html = editor.getHTML();
				const codeMatch = html.match(/<code[^>]*>([\s\S]*?)<\/code>/);
				if (codeMatch) {
					const extractedValue = unescapeHtml(codeMatch[1]);
					if (extractedValue !== value) {
						onChange(extractedValue);
					}
				}
			}
		});
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});

	// Update editor when value prop changes externally
	$: if (editor && value !== undefined) {
		const currentContent = extractJsonFromEditor();
		if (currentContent !== value) {
			editor.commands.setContent(`<pre><code class="language-json">${escapeHtml(value)}</code></pre>`);
		}
	}

	function extractJsonFromEditor(): string {
		if (!editor) return '';
		const html = editor.getHTML();
		const codeMatch = html.match(/<code[^>]*>([\s\S]*?)<\/code>/);
		return codeMatch ? unescapeHtml(codeMatch[1]) : '';
	}

	function escapeHtml(text: string): string {
		return text
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#039;');
	}

	function unescapeHtml(html: string): string {
		return html
			.replace(/&lt;/g, '<')
			.replace(/&gt;/g, '>')
			.replace(/&quot;/g, '"')
			.replace(/&#039;/g, "'")
			.replace(/&amp;/g, '&');
	}
</script>

<div class="tiptap-json-editor">
	<div bind:this={editorElement} class="border border-base-300 rounded-lg bg-base-100 overflow-auto" style="max-height: {height};"></div>
</div>

<style>
	:global(.tiptap-json-editor .ProseMirror) {
		background-color: hsl(var(--b1));
		color: hsl(var(--bc));
	}

	:global(.tiptap-json-editor .ProseMirror pre) {
		background-color: hsl(var(--b2));
		border-radius: 0.5rem;
		color: hsl(var(--bc));
		font-family: 'JetBrains Mono', 'Fira Code', 'Courier New', Courier, monospace;
		padding: 0.75rem 1rem;
		tab-size: 2;
	}

	:global(.tiptap-json-editor .ProseMirror pre code) {
		background: none;
		color: inherit;
		font-size: 0.8rem;
		padding: 0;
	}

	:global(.tiptap-json-editor .ProseMirror:focus) {
		outline: 2px solid hsl(var(--p));
		outline-offset: 2px;
	}

	/* Syntax highlighting for JSON */
	:global(.tiptap-json-editor .hljs-attr) {
		color: #82aaff;
	}

	:global(.tiptap-json-editor .hljs-string) {
		color: #c3e88d;
	}

	:global(.tiptap-json-editor .hljs-number) {
		color: #f78c6c;
	}

	:global(.tiptap-json-editor .hljs-literal) {
		color: #ff5370;
	}

	:global(.tiptap-json-editor .hljs-punctuation) {
		color: #89ddff;
	}
</style>
