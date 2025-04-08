// This file was bundled by Encore v1.46.16
//
// https://encore.dev

// encore.gen/internal/entrypoints/combined/main.ts
import { registerGateways, registerHandlers, run } from "encore.dev/internal/codegen/appinit";
var gateways = [];
var handlers = [];
registerGateways(gateways);
registerHandlers(handlers);
await run(import.meta.url);
//# sourceMappingURL=main.mjs.map
