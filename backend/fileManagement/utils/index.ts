import { FileType } from "../types";

/**
 * Maps MIME types to our internal FileType enum
 */
export function mapMimeTypeToFileType(mime?: string): FileType {
  if (!mime) return FileType.UNKNOWN;

  if (mime.startsWith('audio/')) return FileType.AUDIO;
  if (mime.startsWith('image/')) return FileType.IMAGE;
  if (mime.startsWith('video/')) return FileType.VIDEO;

  // Specific file types
  const mimeMap: Record<string, FileType> = {
    'application/pdf': FileType.PDF,
    'text/html': FileType.HTML,
    'application/json': FileType.JSON,
    'text/markdown': FileType.MARKDOWN,
    'application/vnd.ms-excel': FileType.SPREADSHEET,
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': FileType.SPREADSHEET,
    'application/vnd.ms-powerpoint': FileType.PRESENTATION,
    'application/vnd.openxmlformats-officedocument.presentationml.presentation':
      FileType.PRESENTATION,
    'application/msword': FileType.DOCUMENT,
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': FileType.DOCUMENT,
    'text/plain': FileType.DOCUMENT,
    'application/x-javascript': FileType.CODE,
    'application/javascript': FileType.CODE,
    'text/javascript': FileType.CODE,
    'text/x-python': FileType.CODE,
    'text/x-java': FileType.CODE,
    'text/css': FileType.CODE,
  };

  return mimeMap[mime] || FileType.FILE;
}
