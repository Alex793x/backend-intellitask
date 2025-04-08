/**
 * Represents an ephemeral (temporary) agent configuration used during runtime.
 * These configurations are created dynamically and exist only during execution.
 */
export interface AgentEphemeral {
  /** Unique identifier for the ephemeral agent */
  id: string;
  /** Type of object being represented */
  object: string;
  /** The AI model being used (e.g., GPT-4) */
  model: string;
  /** List of supported interaction modes (text, audio, etc.) */
  modalities: string[];
  /** System instructions that guide the agent's behavior */
  instructions: string;
  /** Voice ID used for text-to-speech conversion */
  voice: string;
  /** Format specification for incoming audio (e.g., mp3, wav) */
  input_audio_format: string;
  /** Format specification for outgoing audio */
  output_audio_format: string;
  /** Configuration settings for speech-to-text conversion */
  input_audio_transcription: {
    /** Model used for audio transcription */
    model: string;
  };
  /** Configuration for detecting conversation turns (currently unused) */
  turn_detection: null;
  /** List of available tools/functions the agent can utilize */
  tools: string[];
  /** Strategy specification for how the agent selects tools */
  tool_choice: string;
  /** Controls randomness in agent responses (0-1) */
  temperature: number;
  /** Maximum token limit for agent responses */
  max_response_output_tokens: number;
  /** Temporary authentication credentials */
  client_secret: {
    /** Secret token for authentication */
    value: string;
    /** Timestamp when the token expires */
    expires_at: number;
  };
}
/**
 * Represents a request configuration for real-time speech processing.
 * Defines the required parameters for voice-based interactions.
 */
export interface RealtimeSpeechRequest {
  /** AI model to be used for processing */
  model: string;
  /** Voice ID for text-to-speech, restricted to currently supported voices */
  voice: 'alloy' | 'ash' | 'ballad' | 'coral' | 'echo' | 'sage' | 'shimmer' | 'verse';
  /** System instructions that guide the agent's behavior */
  instructions: string;
  /** Format specification for incoming audio, currently PCM 16-bit only */
  input_audio_format: 'pcm16';
  /** Format specification for outgoing audio, currently PCM 16-bit only */
  output_audio_format: 'pcm16';
}
