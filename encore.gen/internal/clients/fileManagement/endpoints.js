import { apiCall, streamIn, streamOut, streamInOut } from "encore.dev/internal/codegen/api";

const TEST_ENDPOINTS = typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test"
    ? await import("./endpoints_testing.js")
    : null;

export async function getFilesByIds(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.getFilesByIds(params);
    }

    return apiCall("fileManagement", "getFilesByIds", params);
}

export async function uploadFilesWithMetadata(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.uploadFilesWithMetadata(params);
    }

    return apiCall("fileManagement", "uploadFilesWithMetadata", params);
}

export async function deleteOneFile(params) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.deleteOneFile(params);
    }

    return apiCall("fileManagement", "deleteOneFile", params);
}

