import { registerHandlers, run, type Handler } from "encore.dev/internal/codegen/appinit";
import { Worker, isMainThread } from "node:worker_threads";
import { fileURLToPath } from "node:url";
import { availableParallelism } from "node:os";

import { chat as chatImpl0 } from "../../../../../backend/chats/api/chat.api";
import { findLatestChatMessageByChatroomIds as findLatestChatMessageByChatroomIdsImpl1 } from "../../../../../backend/chats/api/chatmessage.api";
import { findChatMessagesByChatroomId as findChatMessagesByChatroomIdImpl2 } from "../../../../../backend/chats/api/chatmessage.api";
import { getChatMessageReactions as getChatMessageReactionsImpl3 } from "../../../../../backend/chats/api/chatmessageReactions.api";
import { createChatMessageReactions as createChatMessageReactionsImpl4 } from "../../../../../backend/chats/api/chatmessageReactions.api";
import { updateChatMessageReaction as updateChatMessageReactionImpl5 } from "../../../../../backend/chats/api/chatmessageReactions.api";
import { deleteChatMessageReaction as deleteChatMessageReactionImpl6 } from "../../../../../backend/chats/api/chatmessageReactions.api";
import * as chats_service from "../../../../../backend/chats/encore.service";

const handlers: Handler[] = [
    {
        apiRoute: {
            service:           "chats",
            name:              "chat",
            handler:           chatImpl0,
            raw:               false,
            streamingRequest:  true,
            streamingResponse: true,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":true,"tags":[]},
        middlewares: chats_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "chats",
            name:              "findLatestChatMessageByChatroomIds",
            handler:           findLatestChatMessageByChatroomIdsImpl1,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":false,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: chats_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "chats",
            name:              "findChatMessagesByChatroomId",
            handler:           findChatMessagesByChatroomIdImpl2,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":false,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: chats_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "chats",
            name:              "getChatMessageReactions",
            handler:           getChatMessageReactionsImpl3,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":false,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: chats_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "chats",
            name:              "createChatMessageReactions",
            handler:           createChatMessageReactionsImpl4,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: chats_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "chats",
            name:              "updateChatMessageReaction",
            handler:           updateChatMessageReactionImpl5,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: chats_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "chats",
            name:              "deleteChatMessageReaction",
            handler:           deleteChatMessageReactionImpl6,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: chats_service.default.cfg.middlewares || [],
    },
];

registerHandlers(handlers);

await run(import.meta.url);
