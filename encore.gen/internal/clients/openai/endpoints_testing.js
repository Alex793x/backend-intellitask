import { apiCall, streamIn, streamOut, streamInOut } from "encore.dev/internal/codegen/api";
import { registerTestHandler } from "encore.dev/internal/codegen/appinit";

import * as openai_service from "../../../../backend/openai/encore.service";

export async function getSupervisor(params) {
    const handler = (await import("../../../../backend/openai/api/openai.api")).getSupervisor;
    registerTestHandler({
        apiRoute: { service: "openai", name: "getSupervisor", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: openai_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("openai", "getSupervisor", params);
}

export async function getMarketingAdvisor(params) {
    const handler = (await import("../../../../backend/openai/api/openai.api")).getMarketingAdvisor;
    registerTestHandler({
        apiRoute: { service: "openai", name: "getMarketingAdvisor", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: openai_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("openai", "getMarketingAdvisor", params);
}

export async function getProductivityCoach(params) {
    const handler = (await import("../../../../backend/openai/api/openai.api")).getProductivityCoach;
    registerTestHandler({
        apiRoute: { service: "openai", name: "getProductivityCoach", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: openai_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("openai", "getProductivityCoach", params);
}

export async function getTechAdvisor(params) {
    const handler = (await import("../../../../backend/openai/api/openai.api")).getTechAdvisor;
    registerTestHandler({
        apiRoute: { service: "openai", name: "getTechAdvisor", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: openai_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("openai", "getTechAdvisor", params);
}

export async function getHRConsultant(params) {
    const handler = (await import("../../../../backend/openai/api/openai.api")).getHRConsultant;
    registerTestHandler({
        apiRoute: { service: "openai", name: "getHRConsultant", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: openai_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("openai", "getHRConsultant", params);
}

export async function getFinancialAdvisor(params) {
    const handler = (await import("../../../../backend/openai/api/openai.api")).getFinancialAdvisor;
    registerTestHandler({
        apiRoute: { service: "openai", name: "getFinancialAdvisor", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: openai_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("openai", "getFinancialAdvisor", params);
}

export async function getProjectManager(params) {
    const handler = (await import("../../../../backend/openai/api/openai.api")).getProjectManager;
    registerTestHandler({
        apiRoute: { service: "openai", name: "getProjectManager", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: openai_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("openai", "getProjectManager", params);
}

export async function getCommunicationCoach(params) {
    const handler = (await import("../../../../backend/openai/api/openai.api")).getCommunicationCoach;
    registerTestHandler({
        apiRoute: { service: "openai", name: "getCommunicationCoach", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: openai_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("openai", "getCommunicationCoach", params);
}

export async function getLegalAdvisor(params) {
    const handler = (await import("../../../../backend/openai/api/openai.api")).getLegalAdvisor;
    registerTestHandler({
        apiRoute: { service: "openai", name: "getLegalAdvisor", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: openai_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("openai", "getLegalAdvisor", params);
}

export async function getInnovationConsultant(params) {
    const handler = (await import("../../../../backend/openai/api/openai.api")).getInnovationConsultant;
    registerTestHandler({
        apiRoute: { service: "openai", name: "getInnovationConsultant", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: openai_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("openai", "getInnovationConsultant", params);
}

export async function getDataAnalyst(params) {
    const handler = (await import("../../../../backend/openai/api/openai.api")).getDataAnalyst;
    registerTestHandler({
        apiRoute: { service: "openai", name: "getDataAnalyst", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: openai_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("openai", "getDataAnalyst", params);
}

export async function getWellnessCoach(params) {
    const handler = (await import("../../../../backend/openai/api/openai.api")).getWellnessCoach;
    registerTestHandler({
        apiRoute: { service: "openai", name: "getWellnessCoach", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: openai_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("openai", "getWellnessCoach", params);
}

export async function openaiStream(params) {
    const handler = (await import("../../../../backend/openai/api/openai.api")).openaiStream;
    registerTestHandler({
        apiRoute: { service: "openai", name: "openaiStream", raw: true, handler, streamingRequest: false, streamingResponse: false },
        middlewares: openai_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":true,"isRaw":true,"isStream":false,"tags":[]},
    });

    return apiCall("openai", "openaiStream", params);
}

