import {
  StreamInOutHandlerFn,
  StreamInHandlerFn,
  StreamOutHandlerFn,
  StreamOutWithResponse,
  StreamIn,
  StreamInOut,
} from "encore.dev/api";

import { chat as chat_handler } from "../../../../backend/chats/api/chat.api.js";

type StreamHandshake<Type extends (...args: any[]) => any> = Parameters<Type> extends [infer H, any] ? H : void;

type StreamRequest<Type> = Type extends
  | StreamInOutHandlerFn<any, infer Req, any>
  | StreamInHandlerFn<any, infer Req, any>
  | StreamOutHandlerFn<any, any>
  ? Req
  : never;

type StreamResponse<Type> = Type extends
  | StreamInOutHandlerFn<any, any, infer Resp>
  | StreamInHandlerFn<any, any, infer Resp>
  | StreamOutHandlerFn<any, infer Resp>
  ? Resp
  : never;

export function chat(
  data: StreamHandshake<typeof chat_handler>,
): Promise<
  StreamInOut<
    StreamResponse<typeof chat_handler>,
    StreamRequest<typeof chat_handler>
  >
>;
export { findLatestChatMessageByChatroomIds } from "../../../../backend/chats/api/chatmessage.api.js";
export { findChatMessagesByChatroomId } from "../../../../backend/chats/api/chatmessage.api.js";
export { getChatMessageReactions } from "../../../../backend/chats/api/chatmessageReactions.api.js";
export { createChatMessageReactions } from "../../../../backend/chats/api/chatmessageReactions.api.js";
export { updateChatMessageReaction } from "../../../../backend/chats/api/chatmessageReactions.api.js";
export { deleteChatMessageReaction } from "../../../../backend/chats/api/chatmessageReactions.api.js";

