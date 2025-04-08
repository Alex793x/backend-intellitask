import { registerHandlers, run, type Handler } from "encore.dev/internal/codegen/appinit";
import { Worker, isMainThread } from "node:worker_threads";
import { fileURLToPath } from "node:url";
import { availableParallelism } from "node:os";

import { getPublicAgents as getPublicAgentsImpl0 } from "../../../../../backend/fuck/api/agent.api";
import { getAgent as getAgentImpl1 } from "../../../../../backend/fuck/api/agent.api";
import { createAgent as createAgentImpl2 } from "../../../../../backend/fuck/api/agent.api";
import { updateAgent as updateAgentImpl3 } from "../../../../../backend/fuck/api/agent.api";
import { deleteAgent as deleteAgentImpl4 } from "../../../../../backend/fuck/api/agent.api";
import { chatAgent as chatAgentImpl5 } from "../../../../../backend/fuck/api/agent.api";
import { getPublicConfigProfiles as getPublicConfigProfilesImpl6 } from "../../../../../backend/fuck/api/configProfile.api";
import { getConfigProfile as getConfigProfileImpl7 } from "../../../../../backend/fuck/api/configProfile.api";
import { createConfigProfile as createConfigProfileImpl8 } from "../../../../../backend/fuck/api/configProfile.api";
import { updateConfigProfile as updateConfigProfileImpl9 } from "../../../../../backend/fuck/api/configProfile.api";
import { deleteConfigProfile as deleteConfigProfileImpl10 } from "../../../../../backend/fuck/api/configProfile.api";
import { getPublicInstructionSets as getPublicInstructionSetsImpl11 } from "../../../../../backend/fuck/api/instructionSet.api";
import { getInstructionSet as getInstructionSetImpl12 } from "../../../../../backend/fuck/api/instructionSet.api";
import { createInstructionSet as createInstructionSetImpl13 } from "../../../../../backend/fuck/api/instructionSet.api";
import { updateInstructionSet as updateInstructionSetImpl14 } from "../../../../../backend/fuck/api/instructionSet.api";
import { deleteInstructionSet as deleteInstructionSetImpl15 } from "../../../../../backend/fuck/api/instructionSet.api";
import { getModels as getModelsImpl16 } from "../../../../../backend/fuck/api/model.api";
import { getModelsByProvider as getModelsByProviderImpl17 } from "../../../../../backend/fuck/api/model.api";
import { getModel as getModelImpl18 } from "../../../../../backend/fuck/api/model.api";
import { createModel as createModelImpl19 } from "../../../../../backend/fuck/api/model.api";
import { updateModel as updateModelImpl20 } from "../../../../../backend/fuck/api/model.api";
import { deleteModel as deleteModelImpl21 } from "../../../../../backend/fuck/api/model.api";
import { getVoiceProfiles as getVoiceProfilesImpl22 } from "../../../../../backend/fuck/api/voiceProfile.api";
import { getVoiceProfile as getVoiceProfileImpl23 } from "../../../../../backend/fuck/api/voiceProfile.api";
import { createVoiceProfile as createVoiceProfileImpl24 } from "../../../../../backend/fuck/api/voiceProfile.api";
import { updateVoiceProfile as updateVoiceProfileImpl25 } from "../../../../../backend/fuck/api/voiceProfile.api";
import { deleteVoiceProfile as deleteVoiceProfileImpl26 } from "../../../../../backend/fuck/api/voiceProfile.api";
import * as fuck_service from "../../../../../backend/fuck/encore.service";

const handlers: Handler[] = [
    {
        apiRoute: {
            service:           "fuck",
            name:              "getPublicAgents",
            handler:           getPublicAgentsImpl0,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: fuck_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "fuck",
            name:              "getAgent",
            handler:           getAgentImpl1,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: fuck_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "fuck",
            name:              "createAgent",
            handler:           createAgentImpl2,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: fuck_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "fuck",
            name:              "updateAgent",
            handler:           updateAgentImpl3,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: fuck_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "fuck",
            name:              "deleteAgent",
            handler:           deleteAgentImpl4,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: fuck_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "fuck",
            name:              "chatAgent",
            handler:           chatAgentImpl5,
            raw:               true,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":false,"auth":false,"isRaw":true,"isStream":false,"tags":[]},
        middlewares: fuck_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "fuck",
            name:              "getPublicConfigProfiles",
            handler:           getPublicConfigProfilesImpl6,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: fuck_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "fuck",
            name:              "getConfigProfile",
            handler:           getConfigProfileImpl7,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: fuck_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "fuck",
            name:              "createConfigProfile",
            handler:           createConfigProfileImpl8,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: fuck_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "fuck",
            name:              "updateConfigProfile",
            handler:           updateConfigProfileImpl9,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: fuck_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "fuck",
            name:              "deleteConfigProfile",
            handler:           deleteConfigProfileImpl10,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: fuck_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "fuck",
            name:              "getPublicInstructionSets",
            handler:           getPublicInstructionSetsImpl11,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: fuck_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "fuck",
            name:              "getInstructionSet",
            handler:           getInstructionSetImpl12,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: fuck_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "fuck",
            name:              "createInstructionSet",
            handler:           createInstructionSetImpl13,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: fuck_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "fuck",
            name:              "updateInstructionSet",
            handler:           updateInstructionSetImpl14,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: fuck_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "fuck",
            name:              "deleteInstructionSet",
            handler:           deleteInstructionSetImpl15,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: fuck_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "fuck",
            name:              "getModels",
            handler:           getModelsImpl16,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: fuck_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "fuck",
            name:              "getModelsByProvider",
            handler:           getModelsByProviderImpl17,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: fuck_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "fuck",
            name:              "getModel",
            handler:           getModelImpl18,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: fuck_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "fuck",
            name:              "createModel",
            handler:           createModelImpl19,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: fuck_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "fuck",
            name:              "updateModel",
            handler:           updateModelImpl20,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: fuck_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "fuck",
            name:              "deleteModel",
            handler:           deleteModelImpl21,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: fuck_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "fuck",
            name:              "getVoiceProfiles",
            handler:           getVoiceProfilesImpl22,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: fuck_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "fuck",
            name:              "getVoiceProfile",
            handler:           getVoiceProfileImpl23,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: fuck_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "fuck",
            name:              "createVoiceProfile",
            handler:           createVoiceProfileImpl24,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: fuck_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "fuck",
            name:              "updateVoiceProfile",
            handler:           updateVoiceProfileImpl25,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: fuck_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "fuck",
            name:              "deleteVoiceProfile",
            handler:           deleteVoiceProfileImpl26,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: fuck_service.default.cfg.middlewares || [],
    },
];

registerHandlers(handlers);

await run(import.meta.url);
