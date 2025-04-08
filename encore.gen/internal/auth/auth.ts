import { getAuthData as _getAuthData } from "encore.dev/internal/codegen/auth";
import { handler as _auth_handler } from "../../../backend/auth/auth.js";

export type AuthData = Awaited<ReturnType<typeof _auth_handler>>;

export function getAuthData(): AuthData | null {
    return _getAuthData()
}
