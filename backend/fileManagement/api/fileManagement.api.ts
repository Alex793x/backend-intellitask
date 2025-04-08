import { api, APIError } from 'encore.dev/api';
import busboy from 'busboy';
import log from 'encore.dev/log';
import { fileTypeFromBuffer } from 'file-type';
import fileManagementService from '../services/fileManagement.service';
import { Access, FileRequest, FileType, UploadType } from '../types';
import { getAuthData } from '~encore/auth';
import crypto from 'crypto';
import { mapMimeTypeToFileType } from '../utils';
import { GenericResponse } from '../../shared/types';
import { FileDto } from '../types';

/**
 * Get files by their ids
 */
export const getFilesByIds = api<{ fileIds: string[] }, GenericResponse<FileDto[]>>(
  { expose: true, method: 'GET', path: '/files', auth: true },
  async (req): Promise<GenericResponse<FileDto[]>> => {
    const { userID, session } = getAuthData()!;
    const organizationId = session?.activeOrganizationId;

    if (!userID || !organizationId) {
      throw APIError.unauthenticated('User not authenticated');
    }

    return {
      data: await fileManagementService.getFilesByIds(req.fileIds, organizationId),
    };
  }
);

/**
 * Raw endpoint for uploading multiple files with metadata in the request body.
 * This is a more modern approach where the file and metadata are sent in a multipart/form-data request.
 */
export const uploadFilesWithMetadata = api.raw(
  { expose: true, method: 'POST', path: '/upload-with-metadata', bodyLimit: null, auth: true },
  async (req, res) => {
    const { userID, session } = getAuthData()!;
    const organizationId = session?.activeOrganizationId;

    if (!userID || !organizationId) {
      res.writeHead(401, { Connection: 'close' });
      res.end('Unauthorized - User not authenticated');
      return;
    }

    try {
      const bb = busboy({ headers: req.headers });
      const entries: Array<FileRequest> = [];
      let fileMetadata: any = null;
      let receiverIds: string[] = [];

      // Handle the metadata fields from the multipart request
      bb.on('field', (name, val) => {
        if (name === 'metadata') {
          try {
            fileMetadata = JSON.parse(val);
            log.info(`Received file metadata: ${val}`);
          } catch (error) {
            log.error(`Error parsing metadata: ${error}`);
            bb.emit('error', APIError.internal('Invalid metadata format'));
          }
        } else if (name === 'receiverIds') {
          try {
            receiverIds = JSON.parse(val);
            log.info(`Received receiver IDs: ${val}`);
          } catch (error) {
            log.error(`Error parsing receiver IDs: ${error}`);
            bb.emit('error', APIError.internal('Invalid receiver IDs format'));
          }
        }
      });

      // Handle file data
      bb.on('file', (_, file, info) => {
        // Wait until we've received the metadata before processing files
        if (!fileMetadata) {
          bb.emit('error', APIError.internal('File metadata must be provided before file data'));
          return;
        }

        // Generate a UUID for the file to prevent name collisions
        const uuid = crypto.randomUUID();
        const sanitizedFilename = info.filename.replace(/[/\\:*?"<>|]/g, '');
        const newFileName = `${uuid}-${sanitizedFilename}`;

        // Create a file request object with metadata and empty data array
        const entry: FileRequest = {
          uploadedByUserId: userID,
          teamspaceId: fileMetadata.teamspaceId || null,
          projectId: fileMetadata.projectId || null,
          chatroomId: fileMetadata.chatroomId || null,
          organizationId: organizationId,
          fileUrl: '',
          uploadType: fileMetadata.uploadType || UploadType.DOCUMENT,
          allowedUsers: receiverIds.map((userId) => ({ userId, access: Access.VIEW })),
          fileType: FileType.FILE, // Will be updated after examining content
          fileName: newFileName,
          fileSize: 0, // Will be calculated after receiving data
          data: [],
        };

        file
          .on('data', (data) => {
            entry.data?.push(data);
          })
          .on('close', () => {
            entries.push(entry);
          })
          .on('error', (err) => {
            bb.emit('error', APIError.internal(err.message));
          });
      });

      bb.on('close', async () => {
        try {
          if (entries.length === 0) {
            res.writeHead(400, { Connection: 'close' });
            res.end('Error: No files received');
            return;
          }

          const results = [];

          for (const entry of entries) {
            // Create buffer from collected data chunks
            if (!entry.data) {
              throw APIError.internal('Failed to create buffer from file data');
            }
            const buffer = Buffer.concat(entry.data);
            const fileSize = buffer.length;

            // Determine file type from buffer contents
            const fileTypeResult = await fileTypeFromBuffer(buffer);
            const fileType = mapMimeTypeToFileType(fileTypeResult?.mime);

            // Complete the file request object with computed values
            entry.fileType = fileType;
            entry.fileSize = fileSize;

            // Use the service to create and save the file
            const result = await fileManagementService.createOne(entry);
            results.push(result);
            log.info(`File ${entry.fileName} saved`);
          }

          // Return success response without results
          res.writeHead(200, { 'Content-Type': 'application/json', Connection: 'close' });
          res.end();
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : String(err);
          bb.emit('error', APIError.internal(errorMessage));
        }
      });

      bb.on('error', (err) => {
        log.error(`File upload error: ${(err as Error).message}`);
        res.writeHead(500, { Connection: 'close' });
        res.end(`Error: ${(err as Error).message}`);
      });

      req.pipe(bb);
      return;
    } catch (err) {
      log.error(`Upload error: ${(err as Error).message}`);
      res.writeHead(500, { Connection: 'close' });
      res.end(`Error: ${(err as Error).message}`);
    }
  }
);

export const deleteOneFile = api<{ fileId: string; organizationId: string }, Promise<void>>(
  { expose: true, method: 'DELETE', path: '/files/:fileId', auth: true },
  async (req): Promise<void> => {
    const { userID, session } = getAuthData()!;
    const organizationId = session?.activeOrganizationId;

    if (!userID || !organizationId) {
      throw APIError.unauthenticated('User not authenticated');
    }

    await fileManagementService.deleteOne(req.fileId, organizationId);
  }
);
