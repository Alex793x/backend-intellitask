import { apiCall, streamIn, streamOut, streamInOut } from "encore.dev/internal/codegen/api";

const TEST_ENDPOINTS = typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test"
    ? await import("./endpoints_testing.js")
    : null;

export async function getSupervisor(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.getSupervisor(params);
    }

    return apiCall("openai", "getSupervisor", params);
}

export async function getMarketingAdvisor(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.getMarketingAdvisor(params);
    }

    return apiCall("openai", "getMarketingAdvisor", params);
}

export async function getProductivityCoach(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.getProductivityCoach(params);
    }

    return apiCall("openai", "getProductivityCoach", params);
}

export async function getTechAdvisor(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.getTechAdvisor(params);
    }

    return apiCall("openai", "getTechAdvisor", params);
}

export async function getHRConsultant(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.getHRConsultant(params);
    }

    return apiCall("openai", "getHRConsultant", params);
}

export async function getFinancialAdvisor(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.getFinancialAdvisor(params);
    }

    return apiCall("openai", "getFinancialAdvisor", params);
}

export async function getProjectManager(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.getProjectManager(params);
    }

    return apiCall("openai", "getProjectManager", params);
}

export async function getCommunicationCoach(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.getCommunicationCoach(params);
    }

    return apiCall("openai", "getCommunicationCoach", params);
}

export async function getLegalAdvisor(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.getLegalAdvisor(params);
    }

    return apiCall("openai", "getLegalAdvisor", params);
}

export async function getInnovationConsultant(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.getInnovationConsultant(params);
    }

    return apiCall("openai", "getInnovationConsultant", params);
}

export async function getDataAnalyst(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.getDataAnalyst(params);
    }

    return apiCall("openai", "getDataAnalyst", params);
}

export async function getWellnessCoach(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.getWellnessCoach(params);
    }

    return apiCall("openai", "getWellnessCoach", params);
}

export async function openaiStream(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.openaiStream(params);
    }

    return apiCall("openai", "openaiStream", params);
}

