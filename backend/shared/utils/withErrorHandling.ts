import { APIError } from "encore.dev/api";

export async function withErrorHandling<T>(fn: () => Promise<T>, internalErrorMsg: string): Promise<T> {
  try {
    return await fn();
  } catch (error: any) {
    if (error instanceof APIError) {
      throw error;
    }
    throw APIError.internal(`${internalErrorMsg}: ${error.message}`);
  }
}
