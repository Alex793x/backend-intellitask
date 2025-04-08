import { apiCall, streamIn, streamOut, streamInOut } from "encore.dev/internal/codegen/api";

const TEST_ENDPOINTS = typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test"
    ? await import("./endpoints_testing.js")
    : null;

export async function getPublicAgents(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.getPublicAgents(params);
    }

    return apiCall("fuck", "getPublicAgents", params);
}

export async function getAgent(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.getAgent(params);
    }

    return apiCall("fuck", "getAgent", params);
}

export async function createAgent(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.createAgent(params);
    }

    return apiCall("fuck", "createAgent", params);
}

export async function updateAgent(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.updateAgent(params);
    }

    return apiCall("fuck", "updateAgent", params);
}

export async function deleteAgent(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.deleteAgent(params);
    }

    return apiCall("fuck", "deleteAgent", params);
}

export async function chatAgent(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.chatAgent(params);
    }

    return apiCall("fuck", "chatAgent", params);
}

export async function getPublicConfigProfiles(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.getPublicConfigProfiles(params);
    }

    return apiCall("fuck", "getPublicConfigProfiles", params);
}

export async function getConfigProfile(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.getConfigProfile(params);
    }

    return apiCall("fuck", "getConfigProfile", params);
}

export async function createConfigProfile(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.createConfigProfile(params);
    }

    return apiCall("fuck", "createConfigProfile", params);
}

export async function updateConfigProfile(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.updateConfigProfile(params);
    }

    return apiCall("fuck", "updateConfigProfile", params);
}

export async function deleteConfigProfile(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.deleteConfigProfile(params);
    }

    return apiCall("fuck", "deleteConfigProfile", params);
}

export async function getPublicInstructionSets(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.getPublicInstructionSets(params);
    }

    return apiCall("fuck", "getPublicInstructionSets", params);
}

export async function getInstructionSet(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.getInstructionSet(params);
    }

    return apiCall("fuck", "getInstructionSet", params);
}

export async function createInstructionSet(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.createInstructionSet(params);
    }

    return apiCall("fuck", "createInstructionSet", params);
}

export async function updateInstructionSet(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.updateInstructionSet(params);
    }

    return apiCall("fuck", "updateInstructionSet", params);
}

export async function deleteInstructionSet(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.deleteInstructionSet(params);
    }

    return apiCall("fuck", "deleteInstructionSet", params);
}

export async function getModels(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.getModels(params);
    }

    return apiCall("fuck", "getModels", params);
}

export async function getModelsByProvider(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.getModelsByProvider(params);
    }

    return apiCall("fuck", "getModelsByProvider", params);
}

export async function getModel(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.getModel(params);
    }

    return apiCall("fuck", "getModel", params);
}

export async function createModel(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.createModel(params);
    }

    return apiCall("fuck", "createModel", params);
}

export async function updateModel(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.updateModel(params);
    }

    return apiCall("fuck", "updateModel", params);
}

export async function deleteModel(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.deleteModel(params);
    }

    return apiCall("fuck", "deleteModel", params);
}

export async function getVoiceProfiles(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.getVoiceProfiles(params);
    }

    return apiCall("fuck", "getVoiceProfiles", params);
}

export async function getVoiceProfile(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.getVoiceProfile(params);
    }

    return apiCall("fuck", "getVoiceProfile", params);
}

export async function createVoiceProfile(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.createVoiceProfile(params);
    }

    return apiCall("fuck", "createVoiceProfile", params);
}

export async function updateVoiceProfile(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.updateVoiceProfile(params);
    }

    return apiCall("fuck", "updateVoiceProfile", params);
}

export async function deleteVoiceProfile(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.deleteVoiceProfile(params);
    }

    return apiCall("fuck", "deleteVoiceProfile", params);
}

