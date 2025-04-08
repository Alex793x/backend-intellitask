import { registerHandlers, run, type Handler } from "encore.dev/internal/codegen/appinit";
import { Worker, isMainThread } from "node:worker_threads";
import { fileURLToPath } from "node:url";
import { availableParallelism } from "node:os";

import { getFilesByIds as getFilesByIdsImpl0 } from "../../../../../backend/fileManagement/api/fileManagement.api";
import { uploadFilesWithMetadata as uploadFilesWithMetadataImpl1 } from "../../../../../backend/fileManagement/api/fileManagement.api";
import { deleteOneFile as deleteOneFileImpl2 } from "../../../../../backend/fileManagement/api/fileManagement.api";
import * as fileManagement_service from "../../../../../backend/fileManagement/encore.service";

const handlers: Handler[] = [
    {
        apiRoute: {
            service:           "fileManagement",
            name:              "getFilesByIds",
            handler:           getFilesByIdsImpl0,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: fileManagement_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "fileManagement",
            name:              "uploadFilesWithMetadata",
            handler:           uploadFilesWithMetadataImpl1,
            raw:               true,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":true,"isStream":false,"tags":[]},
        middlewares: fileManagement_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "fileManagement",
            name:              "deleteOneFile",
            handler:           deleteOneFileImpl2,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: fileManagement_service.default.cfg.middlewares || [],
    },
];

registerHandlers(handlers);

await run(import.meta.url);
