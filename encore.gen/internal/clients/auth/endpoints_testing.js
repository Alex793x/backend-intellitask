import { apiCall, streamIn, streamOut, streamInOut } from "encore.dev/internal/codegen/api";
import { registerTestHandler } from "encore.dev/internal/codegen/appinit";

import * as auth_service from "../../../../backend/auth/encore.service";

export async function getUserById(params) {
    const handler = (await import("../../../../backend/auth/api/accessManagement.api")).getUserById;
    registerTestHandler({
        apiRoute: { service: "auth", name: "getUserById", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: auth_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":false,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("auth", "getUserById", params);
}

export async function getAllUsers(params) {
    const handler = (await import("../../../../backend/auth/api/accessManagement.api")).getAllUsers;
    registerTestHandler({
        apiRoute: { service: "auth", name: "getAllUsers", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: auth_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":false,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("auth", "getAllUsers", params);
}

export async function getUsersByIds(params) {
    const handler = (await import("../../../../backend/auth/api/accessManagement.api")).getUsersByIds;
    registerTestHandler({
        apiRoute: { service: "auth", name: "getUsersByIds", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: auth_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":false,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("auth", "getUsersByIds", params);
}

export async function getOrganizationById(params) {
    const handler = (await import("../../../../backend/auth/api/accessManagement.api")).getOrganizationById;
    registerTestHandler({
        apiRoute: { service: "auth", name: "getOrganizationById", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: auth_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":false,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("auth", "getOrganizationById", params);
}

export async function getAllOrganizations(params) {
    const handler = (await import("../../../../backend/auth/api/accessManagement.api")).getAllOrganizations;
    registerTestHandler({
        apiRoute: { service: "auth", name: "getAllOrganizations", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: auth_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":false,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("auth", "getAllOrganizations", params);
}

export async function getOrganizationsAttendedByUser(params) {
    const handler = (await import("../../../../backend/auth/api/accessManagement.api")).getOrganizationsAttendedByUser;
    registerTestHandler({
        apiRoute: { service: "auth", name: "getOrganizationsAttendedByUser", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: auth_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("auth", "getOrganizationsAttendedByUser", params);
}

export async function getIfUserHasActiveOrganization(params) {
    const handler = (await import("../../../../backend/auth/api/accessManagement.api")).getIfUserHasActiveOrganization;
    registerTestHandler({
        apiRoute: { service: "auth", name: "getIfUserHasActiveOrganization", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: auth_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("auth", "getIfUserHasActiveOrganization", params);
}

export async function getOrganizationInvitationsByEmail(params) {
    const handler = (await import("../../../../backend/auth/api/accessManagement.api")).getOrganizationInvitationsByEmail;
    registerTestHandler({
        apiRoute: { service: "auth", name: "getOrganizationInvitationsByEmail", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: auth_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("auth", "getOrganizationInvitationsByEmail", params);
}

export async function authRouter(params) {
    const handler = (await import("../../../../backend/auth/api/auth.api")).authRouter;
    registerTestHandler({
        apiRoute: { service: "auth", name: "authRouter", raw: true, handler, streamingRequest: false, streamingResponse: false },
        middlewares: auth_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":false,"isRaw":true,"isStream":false,"tags":[]},
    });

    return apiCall("auth", "authRouter", params);
}

export async function handler(params) {
    const handler = (await import("../../../../backend/auth/api/auth.api")).handler;
    registerTestHandler({
        apiRoute: { service: "auth", name: "handler", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: auth_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("auth", "handler", params);
}

