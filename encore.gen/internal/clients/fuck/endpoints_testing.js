import { apiCall, streamIn, streamOut, streamInOut } from "encore.dev/internal/codegen/api";
import { registerTestHandler } from "encore.dev/internal/codegen/appinit";

import * as fuck_service from "../../../../backend/fuck/encore.service";

export async function getPublicAgents(params) {
    const handler = (await import("../../../../backend/fuck/api/agent.api")).getPublicAgents;
    registerTestHandler({
        apiRoute: { service: "fuck", name: "getPublicAgents", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: fuck_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("fuck", "getPublicAgents", params);
}

export async function getAgent(params) {
    const handler = (await import("../../../../backend/fuck/api/agent.api")).getAgent;
    registerTestHandler({
        apiRoute: { service: "fuck", name: "getAgent", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: fuck_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("fuck", "getAgent", params);
}

export async function createAgent(params) {
    const handler = (await import("../../../../backend/fuck/api/agent.api")).createAgent;
    registerTestHandler({
        apiRoute: { service: "fuck", name: "createAgent", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: fuck_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("fuck", "createAgent", params);
}

export async function updateAgent(params) {
    const handler = (await import("../../../../backend/fuck/api/agent.api")).updateAgent;
    registerTestHandler({
        apiRoute: { service: "fuck", name: "updateAgent", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: fuck_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("fuck", "updateAgent", params);
}

export async function deleteAgent(params) {
    const handler = (await import("../../../../backend/fuck/api/agent.api")).deleteAgent;
    registerTestHandler({
        apiRoute: { service: "fuck", name: "deleteAgent", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: fuck_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("fuck", "deleteAgent", params);
}

export async function chatAgent(params) {
    const handler = (await import("../../../../backend/fuck/api/agent.api")).chatAgent;
    registerTestHandler({
        apiRoute: { service: "fuck", name: "chatAgent", raw: true, handler, streamingRequest: false, streamingResponse: false },
        middlewares: fuck_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":false,"auth":false,"isRaw":true,"isStream":false,"tags":[]},
    });

    return apiCall("fuck", "chatAgent", params);
}

export async function getPublicConfigProfiles(params) {
    const handler = (await import("../../../../backend/fuck/api/configProfile.api")).getPublicConfigProfiles;
    registerTestHandler({
        apiRoute: { service: "fuck", name: "getPublicConfigProfiles", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: fuck_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("fuck", "getPublicConfigProfiles", params);
}

export async function getConfigProfile(params) {
    const handler = (await import("../../../../backend/fuck/api/configProfile.api")).getConfigProfile;
    registerTestHandler({
        apiRoute: { service: "fuck", name: "getConfigProfile", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: fuck_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("fuck", "getConfigProfile", params);
}

export async function createConfigProfile(params) {
    const handler = (await import("../../../../backend/fuck/api/configProfile.api")).createConfigProfile;
    registerTestHandler({
        apiRoute: { service: "fuck", name: "createConfigProfile", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: fuck_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("fuck", "createConfigProfile", params);
}

export async function updateConfigProfile(params) {
    const handler = (await import("../../../../backend/fuck/api/configProfile.api")).updateConfigProfile;
    registerTestHandler({
        apiRoute: { service: "fuck", name: "updateConfigProfile", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: fuck_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("fuck", "updateConfigProfile", params);
}

export async function deleteConfigProfile(params) {
    const handler = (await import("../../../../backend/fuck/api/configProfile.api")).deleteConfigProfile;
    registerTestHandler({
        apiRoute: { service: "fuck", name: "deleteConfigProfile", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: fuck_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("fuck", "deleteConfigProfile", params);
}

export async function getPublicInstructionSets(params) {
    const handler = (await import("../../../../backend/fuck/api/instructionSet.api")).getPublicInstructionSets;
    registerTestHandler({
        apiRoute: { service: "fuck", name: "getPublicInstructionSets", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: fuck_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("fuck", "getPublicInstructionSets", params);
}

export async function getInstructionSet(params) {
    const handler = (await import("../../../../backend/fuck/api/instructionSet.api")).getInstructionSet;
    registerTestHandler({
        apiRoute: { service: "fuck", name: "getInstructionSet", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: fuck_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("fuck", "getInstructionSet", params);
}

export async function createInstructionSet(params) {
    const handler = (await import("../../../../backend/fuck/api/instructionSet.api")).createInstructionSet;
    registerTestHandler({
        apiRoute: { service: "fuck", name: "createInstructionSet", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: fuck_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("fuck", "createInstructionSet", params);
}

export async function updateInstructionSet(params) {
    const handler = (await import("../../../../backend/fuck/api/instructionSet.api")).updateInstructionSet;
    registerTestHandler({
        apiRoute: { service: "fuck", name: "updateInstructionSet", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: fuck_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("fuck", "updateInstructionSet", params);
}

export async function deleteInstructionSet(params) {
    const handler = (await import("../../../../backend/fuck/api/instructionSet.api")).deleteInstructionSet;
    registerTestHandler({
        apiRoute: { service: "fuck", name: "deleteInstructionSet", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: fuck_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("fuck", "deleteInstructionSet", params);
}

export async function getModels(params) {
    const handler = (await import("../../../../backend/fuck/api/model.api")).getModels;
    registerTestHandler({
        apiRoute: { service: "fuck", name: "getModels", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: fuck_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("fuck", "getModels", params);
}

export async function getModelsByProvider(params) {
    const handler = (await import("../../../../backend/fuck/api/model.api")).getModelsByProvider;
    registerTestHandler({
        apiRoute: { service: "fuck", name: "getModelsByProvider", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: fuck_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("fuck", "getModelsByProvider", params);
}

export async function getModel(params) {
    const handler = (await import("../../../../backend/fuck/api/model.api")).getModel;
    registerTestHandler({
        apiRoute: { service: "fuck", name: "getModel", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: fuck_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("fuck", "getModel", params);
}

export async function createModel(params) {
    const handler = (await import("../../../../backend/fuck/api/model.api")).createModel;
    registerTestHandler({
        apiRoute: { service: "fuck", name: "createModel", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: fuck_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("fuck", "createModel", params);
}

export async function updateModel(params) {
    const handler = (await import("../../../../backend/fuck/api/model.api")).updateModel;
    registerTestHandler({
        apiRoute: { service: "fuck", name: "updateModel", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: fuck_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("fuck", "updateModel", params);
}

export async function deleteModel(params) {
    const handler = (await import("../../../../backend/fuck/api/model.api")).deleteModel;
    registerTestHandler({
        apiRoute: { service: "fuck", name: "deleteModel", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: fuck_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("fuck", "deleteModel", params);
}

export async function getVoiceProfiles(params) {
    const handler = (await import("../../../../backend/fuck/api/voiceProfile.api")).getVoiceProfiles;
    registerTestHandler({
        apiRoute: { service: "fuck", name: "getVoiceProfiles", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: fuck_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("fuck", "getVoiceProfiles", params);
}

export async function getVoiceProfile(params) {
    const handler = (await import("../../../../backend/fuck/api/voiceProfile.api")).getVoiceProfile;
    registerTestHandler({
        apiRoute: { service: "fuck", name: "getVoiceProfile", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: fuck_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("fuck", "getVoiceProfile", params);
}

export async function createVoiceProfile(params) {
    const handler = (await import("../../../../backend/fuck/api/voiceProfile.api")).createVoiceProfile;
    registerTestHandler({
        apiRoute: { service: "fuck", name: "createVoiceProfile", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: fuck_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("fuck", "createVoiceProfile", params);
}

export async function updateVoiceProfile(params) {
    const handler = (await import("../../../../backend/fuck/api/voiceProfile.api")).updateVoiceProfile;
    registerTestHandler({
        apiRoute: { service: "fuck", name: "updateVoiceProfile", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: fuck_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("fuck", "updateVoiceProfile", params);
}

export async function deleteVoiceProfile(params) {
    const handler = (await import("../../../../backend/fuck/api/voiceProfile.api")).deleteVoiceProfile;
    registerTestHandler({
        apiRoute: { service: "fuck", name: "deleteVoiceProfile", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: fuck_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("fuck", "deleteVoiceProfile", params);
}

