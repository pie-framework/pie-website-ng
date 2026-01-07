# Web App Implementation Notes

## JSON Editor Choice

**Decision**: Use Monaco Editor (not Tiptap) for JSON editing features.

### Why Monaco?
- Tiptap is for rich text (WYSIWYG) editing, not code/JSON
- Monaco is VS Code's editor, optimized for JSON
- Built-in validation, syntax highlighting, auto-completion
- Can validate against JSON schemas

### Integration Example

```svelte
<!-- src/lib/components/JsonEditor.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import * as monaco from 'monaco-editor';

  export let value: string = '';
  export let schema: any = null;
  export let onChange: (newValue: string) => void = () => {};

  let editorContainer: HTMLDivElement;
  let editor: monaco.editor.IStandaloneCodeEditor;

  onMount(() => {
    // Configure JSON validation
    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      schemas: schema ? [{
        uri: 'http://myserver/foo-schema.json',
        fileMatch: ['*'],
        schema: schema
      }] : []
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
      formatOnType: true
    });

    // Listen for changes
    editor.onDidChangeModelContent(() => {
      onChange(editor.getValue());
    });

    return () => {
      editor.dispose();
    };
  });

  // Update editor when value prop changes
  $: if (editor && editor.getValue() !== value) {
    editor.setValue(value);
  }
</script>

<div bind:this={editorContainer} class="json-editor" />

<style>
  .json-editor {
    width: 100%;
    height: 600px;
    border: 1px solid var(--border-color);
    border-radius: 4px;
  }
</style>
```

### Package Installation

```bash
cd pie-website-app
bun add monaco-editor
```

### Use Cases in Web App

1. **Developer Mode** - Edit transformed PIE JSON
2. **Quick Testing** - Paste PIE JSON to preview
3. **Configuration** - Edit transformation options
4. **Debug View** - Inspect QTI → PIE transformation output

### Alternative Options

If Monaco is too heavy (~5MB), consider:

**CodeMirror 6**:
```bash
bun add @codemirror/lang-json @codemirror/view @codemirror/state
```

Lighter weight (~500KB), good JSON support, but less feature-rich.

**Simple Textarea with Highlighting**:
```bash
bun add prismjs
```

Minimal bundle size, but no editing features like auto-complete.

## Recommendation

Use **Monaco Editor** for the PIE web app:
- Professional editing experience
- Built-in validation against PIE schemas
- Familiar to developers (VS Code)
- Worth the bundle size for the features

Update `docs/web-app-implementation-plan.md` Phase 6 (PIE Preview) to include:
- Monaco Editor integration
- JSON editor view toggle
- PIE schema validation
- Export/copy JSON functionality
