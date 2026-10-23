## Creating Custom Tools

To create a new tool:

1. **Create registration file** (e.g., `my-tool.ts`):

```typescript
import type {
  ToolContext,
  ToolRegistration,
  ToolToolbarRenderResult,
  ToolbarContext
} from '@pie-players/pie-assessment-toolkit/tools/registration';
import { createToolElement } from '@pie-players/pie-assessment-toolkit/tools/registration';

export const myToolRegistration: ToolRegistration = {
  toolId: "myTool",
  name: "My Tool",
  description: "Custom tool description",
  icon: "custom-icon",
  supportedLevels: ["item", "element"],

  isVisibleInContext(context: ToolContext): boolean {
    // Custom visibility logic
    return true;
  },

  renderToolbar(
    context: ToolContext,
    toolbarContext: ToolbarContext
  ): ToolToolbarRenderResult {
    // The element tag comes from the registry's tool tag map (step 2)
    const element = createToolElement(
      this.toolId,
      context,
      toolbarContext,
      toolbarContext.componentOverrides
    ) as HTMLElement & { visible?: boolean };
    const button = {
      toolId: this.toolId,
      label: this.name,
      ariaLabel: this.name,
      onClick: () => toolbarContext.toggleTool(this.toolId),
      active: toolbarContext.isToolVisible(this.toolId)
    };
    element.visible = button.active;

    return {
      toolId: this.toolId,
      button,
      elements: [{ element, mount: "after-buttons", shell: { title: this.name } }],
      sync: () => {
        button.active = toolbarContext.isToolVisible(this.toolId);
        element.visible = button.active;
      }
    };
  }
};
```

2. **Register it** and map the tool id to the custom element you define, either in a registry of its own (`setComponentOverrides`) or beside the packaged tools (`createPackagedToolRegistry({ toolTagMap })`):

```typescript
import { ToolRegistry } from '@pie-players/pie-assessment-toolkit';
import { createPackagedToolRegistry } from '@pie-players/pie-default-tool-loaders';

const registry = new ToolRegistry();
registry.register(myToolRegistration);
registry.setComponentOverrides({ toolTagMap: { myTool: "my-tool" } });

// Beside the packaged tools; setComponentOverrides would replace their tag map.
// The loaders load each packaged tool's element on first render.
const packagedRegistry = createPackagedToolRegistry({
  toolTagMap: { myTool: "my-tool" }
});
packagedRegistry.register(myToolRegistration);
```

3. **Place it, then grant it**: list `myTool` in `tools.placement` at each level where it renders. A profile listing `myTool` in `supports` then grants it, which keeps it on the toolbar through Pass 2; a grant alone renders nothing. The tool id is the support id, so there is no mapping to declare.

### Services, Providers and Config Hooks

A tool element reads the toolkit's services from the runtime context it connects to with `connectToolRuntimeContext`: the toolkit coordinator, the tool coordinator, the TTS service, the highlight coordinator, the catalog resolver and the element tool state store. That context is the one channel. An element declares no prop carrying a service and a registration assigns none onto the element it creates, because a value set at render goes stale when a context republish brings another coordinator.

A tool that needs a backend declares `provider` on its registration. The coordinator registers that provider under the tool's id, and the element starts it with `toolkitCoordinator.ensureProviderReady(baseToolId)`, where `baseToolId` is the tool id without its scope suffix (`parseScopedToolId(toolId)?.baseToolId`). `provider.id` in the tool's config selects an implementation and never renames the registration, so `updateToolConfig` selecting another implementation replaces the provider under the same id.

Config hooks belong to the registration, since they govern the tool's `tools.providers.<toolId>` entry whether or not the tool has a provider. Tools-config validation runs `sanitizeConfig` first and passes its result to `validateConfig`:

```typescript
export const myToolRegistration: ToolRegistration = {
  // ...the fields above
  provider: {
    createProvider: (config) => new MyToolProvider(config?.provider?.id),
    getInitConfig: (config) => config?.provider?.init ?? {},
  },
  sanitizeConfig: (config) => ({ ...config, settings: { ...config.settings } }),
  validateConfig: (config) =>
    config.settings?.mode === "unknown"
      ? [{
          code: "tools.providerValidateFailed",
          severity: "error",
          path: "providers.myTool.settings.mode",
          message: "Unknown mode.",
        }]
      : [],
};
```
