import { apiCall, streamIn, streamOut, streamInOut } from "encore.dev/internal/codegen/api";
import { registerTestHandler } from "encore.dev/internal/codegen/appinit";

import * as chatrooms_service from "../../../../backend/chatrooms/encore.service";

export async function createChatroom(params) {
    const handler = (await import("../../../../backend/chatrooms/api/chatroom.api")).createChatroom;
    registerTestHandler({
        apiRoute: { service: "chatrooms", name: "createChatroom", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: chatrooms_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("chatrooms", "createChatroom", params);
}

export async function getChatrooms(params) {
    const handler = (await import("../../../../backend/chatrooms/api/chatroom.api")).getChatrooms;
    registerTestHandler({
        apiRoute: { service: "chatrooms", name: "getChatrooms", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: chatrooms_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":false,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("chatrooms", "getChatrooms", params);
}

export async function getParticipatingChatroomsWithLatestMessages(params) {
    const handler = (await import("../../../../backend/chatrooms/api/chatroom.api")).getParticipatingChatroomsWithLatestMessages;
    registerTestHandler({
        apiRoute: { service: "chatrooms", name: "getParticipatingChatroomsWithLatestMessages", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: chatrooms_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("chatrooms", "getParticipatingChatroomsWithLatestMessages", params);
}

export async function getChatroom(params) {
    const handler = (await import("../../../../backend/chatrooms/api/chatroom.api")).getChatroom;
    registerTestHandler({
        apiRoute: { service: "chatrooms", name: "getChatroom", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: chatrooms_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("chatrooms", "getChatroom", params);
}

export async function updateChatroom(params) {
    const handler = (await import("../../../../backend/chatrooms/api/chatroom.api")).updateChatroom;
    registerTestHandler({
        apiRoute: { service: "chatrooms", name: "updateChatroom", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: chatrooms_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("chatrooms", "updateChatroom", params);
}

export async function deleteChatroom(params) {
    const handler = (await import("../../../../backend/chatrooms/api/chatroom.api")).deleteChatroom;
    registerTestHandler({
        apiRoute: { service: "chatrooms", name: "deleteChatroom", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: chatrooms_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("chatrooms", "deleteChatroom", params);
}

export async function createOneTeamspaceFile(params) {
    const handler = (await import("../../../../backend/chatrooms/api/fileRelation.api")).createOneTeamspaceFile;
    registerTestHandler({
        apiRoute: { service: "chatrooms", name: "createOneTeamspaceFile", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: chatrooms_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":false,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("chatrooms", "createOneTeamspaceFile", params);
}

export async function createOneProjectFile(params) {
    const handler = (await import("../../../../backend/chatrooms/api/fileRelation.api")).createOneProjectFile;
    registerTestHandler({
        apiRoute: { service: "chatrooms", name: "createOneProjectFile", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: chatrooms_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":false,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("chatrooms", "createOneProjectFile", params);
}

export async function createOneChatroomFile(params) {
    const handler = (await import("../../../../backend/chatrooms/api/fileRelation.api")).createOneChatroomFile;
    registerTestHandler({
        apiRoute: { service: "chatrooms", name: "createOneChatroomFile", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: chatrooms_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":false,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("chatrooms", "createOneChatroomFile", params);
}

export async function deleteOneTeamspaceFile(params) {
    const handler = (await import("../../../../backend/chatrooms/api/fileRelation.api")).deleteOneTeamspaceFile;
    registerTestHandler({
        apiRoute: { service: "chatrooms", name: "deleteOneTeamspaceFile", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: chatrooms_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("chatrooms", "deleteOneTeamspaceFile", params);
}

export async function deleteOneProjectFile(params) {
    const handler = (await import("../../../../backend/chatrooms/api/fileRelation.api")).deleteOneProjectFile;
    registerTestHandler({
        apiRoute: { service: "chatrooms", name: "deleteOneProjectFile", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: chatrooms_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("chatrooms", "deleteOneProjectFile", params);
}

export async function deleteOneChatroomFile(params) {
    const handler = (await import("../../../../backend/chatrooms/api/fileRelation.api")).deleteOneChatroomFile;
    registerTestHandler({
        apiRoute: { service: "chatrooms", name: "deleteOneChatroomFile", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: chatrooms_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("chatrooms", "deleteOneChatroomFile", params);
}

export async function createProject(params) {
    const handler = (await import("../../../../backend/chatrooms/api/project.api")).createProject;
    registerTestHandler({
        apiRoute: { service: "chatrooms", name: "createProject", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: chatrooms_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("chatrooms", "createProject", params);
}

export async function changeProjectMemberStatus(params) {
    const handler = (await import("../../../../backend/chatrooms/api/project.api")).changeProjectMemberStatus;
    registerTestHandler({
        apiRoute: { service: "chatrooms", name: "changeProjectMemberStatus", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: chatrooms_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("chatrooms", "changeProjectMemberStatus", params);
}

export async function getProjects(params) {
    const handler = (await import("../../../../backend/chatrooms/api/project.api")).getProjects;
    registerTestHandler({
        apiRoute: { service: "chatrooms", name: "getProjects", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: chatrooms_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("chatrooms", "getProjects", params);
}

export async function getProject(params) {
    const handler = (await import("../../../../backend/chatrooms/api/project.api")).getProject;
    registerTestHandler({
        apiRoute: { service: "chatrooms", name: "getProject", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: chatrooms_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("chatrooms", "getProject", params);
}

export async function updateProject(params) {
    const handler = (await import("../../../../backend/chatrooms/api/project.api")).updateProject;
    registerTestHandler({
        apiRoute: { service: "chatrooms", name: "updateProject", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: chatrooms_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("chatrooms", "updateProject", params);
}

export async function deleteProject(params) {
    const handler = (await import("../../../../backend/chatrooms/api/project.api")).deleteProject;
    registerTestHandler({
        apiRoute: { service: "chatrooms", name: "deleteProject", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: chatrooms_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("chatrooms", "deleteProject", params);
}

export async function getUserProjects(params) {
    const handler = (await import("../../../../backend/chatrooms/api/project.api")).getUserProjects;
    registerTestHandler({
        apiRoute: { service: "chatrooms", name: "getUserProjects", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: chatrooms_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("chatrooms", "getUserProjects", params);
}

export async function createTeamspace(params) {
    const handler = (await import("../../../../backend/chatrooms/api/teamspace.api")).createTeamspace;
    registerTestHandler({
        apiRoute: { service: "chatrooms", name: "createTeamspace", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: chatrooms_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("chatrooms", "createTeamspace", params);
}

export async function getTeamspaces(params) {
    const handler = (await import("../../../../backend/chatrooms/api/teamspace.api")).getTeamspaces;
    registerTestHandler({
        apiRoute: { service: "chatrooms", name: "getTeamspaces", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: chatrooms_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("chatrooms", "getTeamspaces", params);
}

export async function getTeamspace(params) {
    const handler = (await import("../../../../backend/chatrooms/api/teamspace.api")).getTeamspace;
    registerTestHandler({
        apiRoute: { service: "chatrooms", name: "getTeamspace", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: chatrooms_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("chatrooms", "getTeamspace", params);
}

export async function getParticipatingTeamspaces(params) {
    const handler = (await import("../../../../backend/chatrooms/api/teamspace.api")).getParticipatingTeamspaces;
    registerTestHandler({
        apiRoute: { service: "chatrooms", name: "getParticipatingTeamspaces", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: chatrooms_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("chatrooms", "getParticipatingTeamspaces", params);
}

export async function updateTeamspace(params) {
    const handler = (await import("../../../../backend/chatrooms/api/teamspace.api")).updateTeamspace;
    registerTestHandler({
        apiRoute: { service: "chatrooms", name: "updateTeamspace", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: chatrooms_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("chatrooms", "updateTeamspace", params);
}

export async function changeTeamspaceMemberStatus(params) {
    const handler = (await import("../../../../backend/chatrooms/api/teamspace.api")).changeTeamspaceMemberStatus;
    registerTestHandler({
        apiRoute: { service: "chatrooms", name: "changeTeamspaceMemberStatus", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: chatrooms_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("chatrooms", "changeTeamspaceMemberStatus", params);
}

export async function deleteTeamspace(params) {
    const handler = (await import("../../../../backend/chatrooms/api/teamspace.api")).deleteTeamspace;
    registerTestHandler({
        apiRoute: { service: "chatrooms", name: "deleteTeamspace", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: chatrooms_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("chatrooms", "deleteTeamspace", params);
}

export async function getTeamspaceMembers(params) {
    const handler = (await import("../../../../backend/chatrooms/api/teamspaceMember.api")).getTeamspaceMembers;
    registerTestHandler({
        apiRoute: { service: "chatrooms", name: "getTeamspaceMembers", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: chatrooms_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("chatrooms", "getTeamspaceMembers", params);
}

export async function addTeamspaceMember(params) {
    const handler = (await import("../../../../backend/chatrooms/api/teamspaceMember.api")).addTeamspaceMember;
    registerTestHandler({
        apiRoute: { service: "chatrooms", name: "addTeamspaceMember", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: chatrooms_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("chatrooms", "addTeamspaceMember", params);
}

export async function updateTeamspaceMember(params) {
    const handler = (await import("../../../../backend/chatrooms/api/teamspaceMember.api")).updateTeamspaceMember;
    registerTestHandler({
        apiRoute: { service: "chatrooms", name: "updateTeamspaceMember", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: chatrooms_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("chatrooms", "updateTeamspaceMember", params);
}

export async function removeTeamspaceMember(params) {
    const handler = (await import("../../../../backend/chatrooms/api/teamspaceMember.api")).removeTeamspaceMember;
    registerTestHandler({
        apiRoute: { service: "chatrooms", name: "removeTeamspaceMember", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: chatrooms_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("chatrooms", "removeTeamspaceMember", params);
}

