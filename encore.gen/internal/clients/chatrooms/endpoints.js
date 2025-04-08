import { apiCall, streamIn, streamOut, streamInOut } from "encore.dev/internal/codegen/api";

const TEST_ENDPOINTS = typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test"
    ? await import("./endpoints_testing.js")
    : null;

export async function createChatroom(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.createChatroom(params);
    }

    return apiCall("chatrooms", "createChatroom", params);
}

export async function getChatrooms(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.getChatrooms(params);
    }

    return apiCall("chatrooms", "getChatrooms", params);
}

export async function getParticipatingChatroomsWithLatestMessages(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.getParticipatingChatroomsWithLatestMessages(params);
    }

    return apiCall("chatrooms", "getParticipatingChatroomsWithLatestMessages", params);
}

export async function getChatroom(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.getChatroom(params);
    }

    return apiCall("chatrooms", "getChatroom", params);
}

export async function updateChatroom(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.updateChatroom(params);
    }

    return apiCall("chatrooms", "updateChatroom", params);
}

export async function deleteChatroom(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.deleteChatroom(params);
    }

    return apiCall("chatrooms", "deleteChatroom", params);
}

export async function createOneTeamspaceFile(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.createOneTeamspaceFile(params);
    }

    return apiCall("chatrooms", "createOneTeamspaceFile", params);
}

export async function createOneProjectFile(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.createOneProjectFile(params);
    }

    return apiCall("chatrooms", "createOneProjectFile", params);
}

export async function createOneChatroomFile(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.createOneChatroomFile(params);
    }

    return apiCall("chatrooms", "createOneChatroomFile", params);
}

export async function deleteOneTeamspaceFile(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.deleteOneTeamspaceFile(params);
    }

    return apiCall("chatrooms", "deleteOneTeamspaceFile", params);
}

export async function deleteOneProjectFile(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.deleteOneProjectFile(params);
    }

    return apiCall("chatrooms", "deleteOneProjectFile", params);
}

export async function deleteOneChatroomFile(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.deleteOneChatroomFile(params);
    }

    return apiCall("chatrooms", "deleteOneChatroomFile", params);
}

export async function createProject(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.createProject(params);
    }

    return apiCall("chatrooms", "createProject", params);
}

export async function changeProjectMemberStatus(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.changeProjectMemberStatus(params);
    }

    return apiCall("chatrooms", "changeProjectMemberStatus", params);
}

export async function getProjects(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.getProjects(params);
    }

    return apiCall("chatrooms", "getProjects", params);
}

export async function getProject(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.getProject(params);
    }

    return apiCall("chatrooms", "getProject", params);
}

export async function updateProject(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.updateProject(params);
    }

    return apiCall("chatrooms", "updateProject", params);
}

export async function deleteProject(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.deleteProject(params);
    }

    return apiCall("chatrooms", "deleteProject", params);
}

export async function getUserProjects(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.getUserProjects(params);
    }

    return apiCall("chatrooms", "getUserProjects", params);
}

export async function createTeamspace(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.createTeamspace(params);
    }

    return apiCall("chatrooms", "createTeamspace", params);
}

export async function getTeamspaces(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.getTeamspaces(params);
    }

    return apiCall("chatrooms", "getTeamspaces", params);
}

export async function getTeamspace(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.getTeamspace(params);
    }

    return apiCall("chatrooms", "getTeamspace", params);
}

export async function getParticipatingTeamspaces(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.getParticipatingTeamspaces(params);
    }

    return apiCall("chatrooms", "getParticipatingTeamspaces", params);
}

export async function updateTeamspace(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.updateTeamspace(params);
    }

    return apiCall("chatrooms", "updateTeamspace", params);
}

export async function changeTeamspaceMemberStatus(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.changeTeamspaceMemberStatus(params);
    }

    return apiCall("chatrooms", "changeTeamspaceMemberStatus", params);
}

export async function deleteTeamspace(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.deleteTeamspace(params);
    }

    return apiCall("chatrooms", "deleteTeamspace", params);
}

export async function getTeamspaceMembers(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.getTeamspaceMembers(params);
    }

    return apiCall("chatrooms", "getTeamspaceMembers", params);
}

export async function addTeamspaceMember(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.addTeamspaceMember(params);
    }

    return apiCall("chatrooms", "addTeamspaceMember", params);
}

export async function updateTeamspaceMember(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.updateTeamspaceMember(params);
    }

    return apiCall("chatrooms", "updateTeamspaceMember", params);
}

export async function removeTeamspaceMember(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.removeTeamspaceMember(params);
    }

    return apiCall("chatrooms", "removeTeamspaceMember", params);
}

