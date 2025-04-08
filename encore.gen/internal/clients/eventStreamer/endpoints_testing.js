import { apiCall, streamIn, streamOut, streamInOut } from "encore.dev/internal/codegen/api";
import { registerTestHandler } from "encore.dev/internal/codegen/appinit";

import * as eventStreamer_service from "../../../../backend/eventStreamer/encore.service";

export async function eventsStream(params) {
    const handler = (await import("../../../../backend/eventStreamer/api/events.api")).eventsStream;
    registerTestHandler({
        apiRoute: { service: "eventStreamer", name: "eventsStream", raw: false, handler, streamingRequest: false, streamingResponse: true },
        middlewares: eventStreamer_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":true,"tags":[]},
    });

    return streamOut("eventStreamer", "eventsStream", params);
}

export async function stats(params) {
    const handler = (await import("../../../../backend/eventStreamer/api/events.api")).stats;
    registerTestHandler({
        apiRoute: { service: "eventStreamer", name: "stats", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: eventStreamer_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("eventStreamer", "stats", params);
}

