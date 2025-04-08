import { apiCall, streamIn, streamOut, streamInOut } from "encore.dev/internal/codegen/api";

const TEST_ENDPOINTS = typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test"
    ? await import("./endpoints_testing.js")
    : null;

export async function getUserById(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.getUserById(params);
    }

    return apiCall("auth", "getUserById", params);
}

export async function getAllUsers(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.getAllUsers(params);
    }

    return apiCall("auth", "getAllUsers", params);
}

export async function getUsersByIds(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.getUsersByIds(params);
    }

    return apiCall("auth", "getUsersByIds", params);
}

export async function getOrganizationById(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.getOrganizationById(params);
    }

    return apiCall("auth", "getOrganizationById", params);
}

export async function getAllOrganizations(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.getAllOrganizations(params);
    }

    return apiCall("auth", "getAllOrganizations", params);
}

export async function getOrganizationsAttendedByUser(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.getOrganizationsAttendedByUser(params);
    }

    return apiCall("auth", "getOrganizationsAttendedByUser", params);
}

export async function getIfUserHasActiveOrganization(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.getIfUserHasActiveOrganization(params);
    }

    return apiCall("auth", "getIfUserHasActiveOrganization", params);
}

export async function getOrganizationInvitationsByEmail(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.getOrganizationInvitationsByEmail(params);
    }

    return apiCall("auth", "getOrganizationInvitationsByEmail", params);
}

export async function authRouter(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.authRouter(params);
    }

    return apiCall("auth", "authRouter", params);
}

export async function handler(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.handler(params);
    }

    return apiCall("auth", "handler", params);
}

