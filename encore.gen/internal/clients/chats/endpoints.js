import { apiCall, streamIn, streamOut, streamInOut } from "encore.dev/internal/codegen/api";

const TEST_ENDPOINTS = typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test"
    ? await import("./endpoints_testing.js")
    : null;

export async function chat(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.chat(params);
    }

    return streamInOut("chats", "chat", params);
}

export async function findLatestChatMessageByChatroomIds(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.findLatestChatMessageByChatroomIds(params);
    }

    return apiCall("chats", "findLatestChatMessageByChatroomIds", params);
}

export async function findChatMessagesByChatroomId(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.findChatMessagesByChatroomId(params);
    }

    return apiCall("chats", "findChatMessagesByChatroomId", params);
}

export async function getChatMessageReactions(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.getChatMessageReactions(params);
    }

    return apiCall("chats", "getChatMessageReactions", params);
}

export async function createChatMessageReactions(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.createChatMessageReactions(params);
    }

    return apiCall("chats", "createChatMessageReactions", params);
}

export async function updateChatMessageReaction(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.updateChatMessageReaction(params);
    }

    return apiCall("chats", "updateChatMessageReaction", params);
}

export async function deleteChatMessageReaction(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.deleteChatMessageReaction(params);
    }

    return apiCall("chats", "deleteChatMessageReaction", params);
}

