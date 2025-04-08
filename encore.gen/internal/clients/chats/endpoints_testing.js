import { apiCall, streamIn, streamOut, streamInOut } from "encore.dev/internal/codegen/api";
import { registerTestHandler } from "encore.dev/internal/codegen/appinit";

import * as chats_service from "../../../../backend/chats/encore.service";

export async function chat(params) {
    const handler = (await import("../../../../backend/chats/api/chat.api")).chat;
    registerTestHandler({
        apiRoute: { service: "chats", name: "chat", raw: false, handler, streamingRequest: true, streamingResponse: true },
        middlewares: chats_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":true,"tags":[]},
    });

    return streamInOut("chats", "chat", params);
}

export async function findLatestChatMessageByChatroomIds(params) {
    const handler = (await import("../../../../backend/chats/api/chatmessage.api")).findLatestChatMessageByChatroomIds;
    registerTestHandler({
        apiRoute: { service: "chats", name: "findLatestChatMessageByChatroomIds", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: chats_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":false,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("chats", "findLatestChatMessageByChatroomIds", params);
}

export async function findChatMessagesByChatroomId(params) {
    const handler = (await import("../../../../backend/chats/api/chatmessage.api")).findChatMessagesByChatroomId;
    registerTestHandler({
        apiRoute: { service: "chats", name: "findChatMessagesByChatroomId", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: chats_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":false,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("chats", "findChatMessagesByChatroomId", params);
}

export async function getChatMessageReactions(params) {
    const handler = (await import("../../../../backend/chats/api/chatmessageReactions.api")).getChatMessageReactions;
    registerTestHandler({
        apiRoute: { service: "chats", name: "getChatMessageReactions", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: chats_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":false,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("chats", "getChatMessageReactions", params);
}

export async function createChatMessageReactions(params) {
    const handler = (await import("../../../../backend/chats/api/chatmessageReactions.api")).createChatMessageReactions;
    registerTestHandler({
        apiRoute: { service: "chats", name: "createChatMessageReactions", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: chats_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("chats", "createChatMessageReactions", params);
}

export async function updateChatMessageReaction(params) {
    const handler = (await import("../../../../backend/chats/api/chatmessageReactions.api")).updateChatMessageReaction;
    registerTestHandler({
        apiRoute: { service: "chats", name: "updateChatMessageReaction", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: chats_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("chats", "updateChatMessageReaction", params);
}

export async function deleteChatMessageReaction(params) {
    const handler = (await import("../../../../backend/chats/api/chatmessageReactions.api")).deleteChatMessageReaction;
    registerTestHandler({
        apiRoute: { service: "chats", name: "deleteChatMessageReaction", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: chats_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("chats", "deleteChatMessageReaction", params);
}

