import { apiCall, streamIn, streamOut, streamInOut } from "encore.dev/internal/codegen/api";
import { registerTestHandler } from "encore.dev/internal/codegen/appinit";

import * as fileManagement_service from "../../../../backend/fileManagement/encore.service";

export async function getFilesByIds(params) {
    const handler = (await import("../../../../backend/fileManagement/api/fileManagement.api")).getFilesByIds;
    registerTestHandler({
        apiRoute: { service: "fileManagement", name: "getFilesByIds", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: fileManagement_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("fileManagement", "getFilesByIds", params);
}

export async function uploadFilesWithMetadata(params) {
    const handler = (await import("../../../../backend/fileManagement/api/fileManagement.api")).uploadFilesWithMetadata;
    registerTestHandler({
        apiRoute: { service: "fileManagement", name: "uploadFilesWithMetadata", raw: true, handler, streamingRequest: false, streamingResponse: false },
        middlewares: fileManagement_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":true,"isRaw":true,"isStream":false,"tags":[]},
    });

    return apiCall("fileManagement", "uploadFilesWithMetadata", params);
}

export async function deleteOneFile(params) {
    const handler = (await import("../../../../backend/fileManagement/api/fileManagement.api")).deleteOneFile;
    registerTestHandler({
        apiRoute: { service: "fileManagement", name: "deleteOneFile", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: fileManagement_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("fileManagement", "deleteOneFile", params);
}

