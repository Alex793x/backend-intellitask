import { AgentEphemeral, RealtimeSpeechRequest } from "../types";

export interface IOpenAIService {
  startRealTimeSpeechConversation(speechModelRequest: RealtimeSpeechRequest, token?: string): Promise<AgentEphemeral>;
}
