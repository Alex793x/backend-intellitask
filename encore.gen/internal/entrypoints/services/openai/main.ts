import { registerHandlers, run, type Handler } from "encore.dev/internal/codegen/appinit";
import { Worker, isMainThread } from "node:worker_threads";
import { fileURLToPath } from "node:url";
import { availableParallelism } from "node:os";

import { getSupervisor as getSupervisorImpl0 } from "../../../../../backend/openai/api/openai.api";
import { getMarketingAdvisor as getMarketingAdvisorImpl1 } from "../../../../../backend/openai/api/openai.api";
import { getProductivityCoach as getProductivityCoachImpl2 } from "../../../../../backend/openai/api/openai.api";
import { getTechAdvisor as getTechAdvisorImpl3 } from "../../../../../backend/openai/api/openai.api";
import { getHRConsultant as getHRConsultantImpl4 } from "../../../../../backend/openai/api/openai.api";
import { getFinancialAdvisor as getFinancialAdvisorImpl5 } from "../../../../../backend/openai/api/openai.api";
import { getProjectManager as getProjectManagerImpl6 } from "../../../../../backend/openai/api/openai.api";
import { getCommunicationCoach as getCommunicationCoachImpl7 } from "../../../../../backend/openai/api/openai.api";
import { getLegalAdvisor as getLegalAdvisorImpl8 } from "../../../../../backend/openai/api/openai.api";
import { getInnovationConsultant as getInnovationConsultantImpl9 } from "../../../../../backend/openai/api/openai.api";
import { getDataAnalyst as getDataAnalystImpl10 } from "../../../../../backend/openai/api/openai.api";
import { getWellnessCoach as getWellnessCoachImpl11 } from "../../../../../backend/openai/api/openai.api";
import { openaiStream as openaiStreamImpl12 } from "../../../../../backend/openai/api/openai.api";
import * as openai_service from "../../../../../backend/openai/encore.service";

const handlers: Handler[] = [
    {
        apiRoute: {
            service:           "openai",
            name:              "getSupervisor",
            handler:           getSupervisorImpl0,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: openai_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "openai",
            name:              "getMarketingAdvisor",
            handler:           getMarketingAdvisorImpl1,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: openai_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "openai",
            name:              "getProductivityCoach",
            handler:           getProductivityCoachImpl2,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: openai_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "openai",
            name:              "getTechAdvisor",
            handler:           getTechAdvisorImpl3,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: openai_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "openai",
            name:              "getHRConsultant",
            handler:           getHRConsultantImpl4,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: openai_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "openai",
            name:              "getFinancialAdvisor",
            handler:           getFinancialAdvisorImpl5,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: openai_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "openai",
            name:              "getProjectManager",
            handler:           getProjectManagerImpl6,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: openai_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "openai",
            name:              "getCommunicationCoach",
            handler:           getCommunicationCoachImpl7,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: openai_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "openai",
            name:              "getLegalAdvisor",
            handler:           getLegalAdvisorImpl8,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: openai_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "openai",
            name:              "getInnovationConsultant",
            handler:           getInnovationConsultantImpl9,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: openai_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "openai",
            name:              "getDataAnalyst",
            handler:           getDataAnalystImpl10,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: openai_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "openai",
            name:              "getWellnessCoach",
            handler:           getWellnessCoachImpl11,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: openai_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "openai",
            name:              "openaiStream",
            handler:           openaiStreamImpl12,
            raw:               true,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":true,"isStream":false,"tags":[]},
        middlewares: openai_service.default.cfg.middlewares || [],
    },
];

registerHandlers(handlers);

await run(import.meta.url);
