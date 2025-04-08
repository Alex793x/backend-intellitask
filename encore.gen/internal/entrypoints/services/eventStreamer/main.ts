import { registerHandlers, run, type Handler } from "encore.dev/internal/codegen/appinit";
import { Worker, isMainThread } from "node:worker_threads";
import { fileURLToPath } from "node:url";
import { availableParallelism } from "node:os";

import { eventsStream as eventsStreamImpl0 } from "../../../../../backend/eventStreamer/api/events.api";
import { stats as statsImpl1 } from "../../../../../backend/eventStreamer/api/events.api";
import "../../../../../backend/eventStreamer/messaging/events.messaging";
import * as eventStreamer_service from "../../../../../backend/eventStreamer/encore.service";

const handlers: Handler[] = [
    {
        apiRoute: {
            service:           "eventStreamer",
            name:              "eventsStream",
            handler:           eventsStreamImpl0,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: true,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":true,"tags":[]},
        middlewares: eventStreamer_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "eventStreamer",
            name:              "stats",
            handler:           statsImpl1,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: eventStreamer_service.default.cfg.middlewares || [],
    },
];

registerHandlers(handlers);

await run(import.meta.url);
