import { registerHandlers, run, type Handler } from "encore.dev/internal/codegen/appinit";
import { Worker, isMainThread } from "node:worker_threads";
import { fileURLToPath } from "node:url";
import { availableParallelism } from "node:os";

import { createChatroom as createChatroomImpl0 } from "../../../../../backend/chatrooms/api/chatroom.api";
import { getChatrooms as getChatroomsImpl1 } from "../../../../../backend/chatrooms/api/chatroom.api";
import { getParticipatingChatroomsWithLatestMessages as getParticipatingChatroomsWithLatestMessagesImpl2 } from "../../../../../backend/chatrooms/api/chatroom.api";
import { getChatroom as getChatroomImpl3 } from "../../../../../backend/chatrooms/api/chatroom.api";
import { updateChatroom as updateChatroomImpl4 } from "../../../../../backend/chatrooms/api/chatroom.api";
import { deleteChatroom as deleteChatroomImpl5 } from "../../../../../backend/chatrooms/api/chatroom.api";
import { createOneTeamspaceFile as createOneTeamspaceFileImpl6 } from "../../../../../backend/chatrooms/api/fileRelation.api";
import { createOneProjectFile as createOneProjectFileImpl7 } from "../../../../../backend/chatrooms/api/fileRelation.api";
import { createOneChatroomFile as createOneChatroomFileImpl8 } from "../../../../../backend/chatrooms/api/fileRelation.api";
import { deleteOneTeamspaceFile as deleteOneTeamspaceFileImpl9 } from "../../../../../backend/chatrooms/api/fileRelation.api";
import { deleteOneProjectFile as deleteOneProjectFileImpl10 } from "../../../../../backend/chatrooms/api/fileRelation.api";
import { deleteOneChatroomFile as deleteOneChatroomFileImpl11 } from "../../../../../backend/chatrooms/api/fileRelation.api";
import { createProject as createProjectImpl12 } from "../../../../../backend/chatrooms/api/project.api";
import { changeProjectMemberStatus as changeProjectMemberStatusImpl13 } from "../../../../../backend/chatrooms/api/project.api";
import { getProjects as getProjectsImpl14 } from "../../../../../backend/chatrooms/api/project.api";
import { getProject as getProjectImpl15 } from "../../../../../backend/chatrooms/api/project.api";
import { updateProject as updateProjectImpl16 } from "../../../../../backend/chatrooms/api/project.api";
import { deleteProject as deleteProjectImpl17 } from "../../../../../backend/chatrooms/api/project.api";
import { getUserProjects as getUserProjectsImpl18 } from "../../../../../backend/chatrooms/api/project.api";
import { createTeamspace as createTeamspaceImpl19 } from "../../../../../backend/chatrooms/api/teamspace.api";
import { getTeamspaces as getTeamspacesImpl20 } from "../../../../../backend/chatrooms/api/teamspace.api";
import { getTeamspace as getTeamspaceImpl21 } from "../../../../../backend/chatrooms/api/teamspace.api";
import { getParticipatingTeamspaces as getParticipatingTeamspacesImpl22 } from "../../../../../backend/chatrooms/api/teamspace.api";
import { updateTeamspace as updateTeamspaceImpl23 } from "../../../../../backend/chatrooms/api/teamspace.api";
import { changeTeamspaceMemberStatus as changeTeamspaceMemberStatusImpl24 } from "../../../../../backend/chatrooms/api/teamspace.api";
import { deleteTeamspace as deleteTeamspaceImpl25 } from "../../../../../backend/chatrooms/api/teamspace.api";
import { getTeamspaceMembers as getTeamspaceMembersImpl26 } from "../../../../../backend/chatrooms/api/teamspaceMember.api";
import { addTeamspaceMember as addTeamspaceMemberImpl27 } from "../../../../../backend/chatrooms/api/teamspaceMember.api";
import { updateTeamspaceMember as updateTeamspaceMemberImpl28 } from "../../../../../backend/chatrooms/api/teamspaceMember.api";
import { removeTeamspaceMember as removeTeamspaceMemberImpl29 } from "../../../../../backend/chatrooms/api/teamspaceMember.api";
import * as chatrooms_service from "../../../../../backend/chatrooms/encore.service";

const handlers: Handler[] = [
    {
        apiRoute: {
            service:           "chatrooms",
            name:              "createChatroom",
            handler:           createChatroomImpl0,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: chatrooms_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "chatrooms",
            name:              "getChatrooms",
            handler:           getChatroomsImpl1,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":false,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: chatrooms_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "chatrooms",
            name:              "getParticipatingChatroomsWithLatestMessages",
            handler:           getParticipatingChatroomsWithLatestMessagesImpl2,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: chatrooms_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "chatrooms",
            name:              "getChatroom",
            handler:           getChatroomImpl3,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: chatrooms_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "chatrooms",
            name:              "updateChatroom",
            handler:           updateChatroomImpl4,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: chatrooms_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "chatrooms",
            name:              "deleteChatroom",
            handler:           deleteChatroomImpl5,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: chatrooms_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "chatrooms",
            name:              "createOneTeamspaceFile",
            handler:           createOneTeamspaceFileImpl6,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":false,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: chatrooms_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "chatrooms",
            name:              "createOneProjectFile",
            handler:           createOneProjectFileImpl7,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":false,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: chatrooms_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "chatrooms",
            name:              "createOneChatroomFile",
            handler:           createOneChatroomFileImpl8,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":false,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: chatrooms_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "chatrooms",
            name:              "deleteOneTeamspaceFile",
            handler:           deleteOneTeamspaceFileImpl9,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: chatrooms_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "chatrooms",
            name:              "deleteOneProjectFile",
            handler:           deleteOneProjectFileImpl10,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: chatrooms_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "chatrooms",
            name:              "deleteOneChatroomFile",
            handler:           deleteOneChatroomFileImpl11,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: chatrooms_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "chatrooms",
            name:              "createProject",
            handler:           createProjectImpl12,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: chatrooms_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "chatrooms",
            name:              "changeProjectMemberStatus",
            handler:           changeProjectMemberStatusImpl13,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: chatrooms_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "chatrooms",
            name:              "getProjects",
            handler:           getProjectsImpl14,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: chatrooms_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "chatrooms",
            name:              "getProject",
            handler:           getProjectImpl15,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: chatrooms_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "chatrooms",
            name:              "updateProject",
            handler:           updateProjectImpl16,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: chatrooms_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "chatrooms",
            name:              "deleteProject",
            handler:           deleteProjectImpl17,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: chatrooms_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "chatrooms",
            name:              "getUserProjects",
            handler:           getUserProjectsImpl18,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: chatrooms_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "chatrooms",
            name:              "createTeamspace",
            handler:           createTeamspaceImpl19,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: chatrooms_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "chatrooms",
            name:              "getTeamspaces",
            handler:           getTeamspacesImpl20,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: chatrooms_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "chatrooms",
            name:              "getTeamspace",
            handler:           getTeamspaceImpl21,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: chatrooms_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "chatrooms",
            name:              "getParticipatingTeamspaces",
            handler:           getParticipatingTeamspacesImpl22,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: chatrooms_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "chatrooms",
            name:              "updateTeamspace",
            handler:           updateTeamspaceImpl23,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: chatrooms_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "chatrooms",
            name:              "changeTeamspaceMemberStatus",
            handler:           changeTeamspaceMemberStatusImpl24,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: chatrooms_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "chatrooms",
            name:              "deleteTeamspace",
            handler:           deleteTeamspaceImpl25,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: chatrooms_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "chatrooms",
            name:              "getTeamspaceMembers",
            handler:           getTeamspaceMembersImpl26,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: chatrooms_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "chatrooms",
            name:              "addTeamspaceMember",
            handler:           addTeamspaceMemberImpl27,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: chatrooms_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "chatrooms",
            name:              "updateTeamspaceMember",
            handler:           updateTeamspaceMemberImpl28,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: chatrooms_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "chatrooms",
            name:              "removeTeamspaceMember",
            handler:           removeTeamspaceMemberImpl29,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: chatrooms_service.default.cfg.middlewares || [],
    },
];

registerHandlers(handlers);

await run(import.meta.url);
