import { registerHandlers, run, type Handler } from "encore.dev/internal/codegen/appinit";
import { Worker, isMainThread } from "node:worker_threads";
import { fileURLToPath } from "node:url";
import { availableParallelism } from "node:os";

import { getUserById as getUserByIdImpl0 } from "../../../../../backend/auth/api/accessManagement.api";
import { getAllUsers as getAllUsersImpl1 } from "../../../../../backend/auth/api/accessManagement.api";
import { getUsersByIds as getUsersByIdsImpl2 } from "../../../../../backend/auth/api/accessManagement.api";
import { getOrganizationById as getOrganizationByIdImpl3 } from "../../../../../backend/auth/api/accessManagement.api";
import { getAllOrganizations as getAllOrganizationsImpl4 } from "../../../../../backend/auth/api/accessManagement.api";
import { getOrganizationsAttendedByUser as getOrganizationsAttendedByUserImpl5 } from "../../../../../backend/auth/api/accessManagement.api";
import { getIfUserHasActiveOrganization as getIfUserHasActiveOrganizationImpl6 } from "../../../../../backend/auth/api/accessManagement.api";
import { getOrganizationInvitationsByEmail as getOrganizationInvitationsByEmailImpl7 } from "../../../../../backend/auth/api/accessManagement.api";
import { authRouter as authRouterImpl8 } from "../../../../../backend/auth/api/auth.api";
import { handler as handlerImpl9 } from "../../../../../backend/auth/api/auth.api";
import * as auth_service from "../../../../../backend/auth/encore.service";

const handlers: Handler[] = [
    {
        apiRoute: {
            service:           "auth",
            name:              "getUserById",
            handler:           getUserByIdImpl0,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":false,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: auth_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "auth",
            name:              "getAllUsers",
            handler:           getAllUsersImpl1,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":false,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: auth_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "auth",
            name:              "getUsersByIds",
            handler:           getUsersByIdsImpl2,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":false,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: auth_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "auth",
            name:              "getOrganizationById",
            handler:           getOrganizationByIdImpl3,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":false,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: auth_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "auth",
            name:              "getAllOrganizations",
            handler:           getAllOrganizationsImpl4,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":false,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: auth_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "auth",
            name:              "getOrganizationsAttendedByUser",
            handler:           getOrganizationsAttendedByUserImpl5,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: auth_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "auth",
            name:              "getIfUserHasActiveOrganization",
            handler:           getIfUserHasActiveOrganizationImpl6,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: auth_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "auth",
            name:              "getOrganizationInvitationsByEmail",
            handler:           getOrganizationInvitationsByEmailImpl7,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: auth_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "auth",
            name:              "authRouter",
            handler:           authRouterImpl8,
            raw:               true,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":false,"isRaw":true,"isStream":false,"tags":[]},
        middlewares: auth_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "auth",
            name:              "handler",
            handler:           handlerImpl9,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: auth_service.default.cfg.middlewares || [],
    },
];

registerHandlers(handlers);

await run(import.meta.url);
