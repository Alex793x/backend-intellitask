import {
  StreamInOutHandlerFn,
  StreamInHandlerFn,
  StreamOutHandlerFn,
  StreamOutWithResponse,
  StreamIn,
  StreamInOut,
} from "encore.dev/api";

import { eventsStream as eventsStream_handler } from "../../../../backend/eventStreamer/api/events.api.js";

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

export function eventsStream(
  data: StreamHandshake<typeof eventsStream_handler>,
): Promise<
  StreamIn<
    StreamResponse<typeof eventsStream_handler>
  >
>;
export { stats } from "../../../../backend/eventStreamer/api/events.api.js";

