import { FileDto } from '../../fileManagement/types';

/**
 * Extracts and cleans the filename from a file path or URL
 * @param filePathOrName Full file path/URL or filename
 * @returns Cleaned filename without path components and prefixes
 */
export function removeUuidPrefix(filePathOrName: string): string {
  if (!filePathOrName) return filePathOrName;

  // First extract just the filename from the full path by getting everything after the last '/'
  let fileName = filePathOrName;
  if (filePathOrName.includes('/')) {
    fileName = filePathOrName.substring(filePathOrName.lastIndexOf('/') + 1);
  }

  // Step 1: Match timestamp pattern (unix timestamp followed by a dash)
  const timestampPattern = /^\d+-/;
  let cleanedName = fileName.replace(timestampPattern, '');

  // Step 2: Match UUID pattern: 8-4-4-4-12 hex digits followed by a dash
  const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}-/i;
  cleanedName = cleanedName.replace(uuidPattern, '');

  return cleanedName;
}

/**
 * Cleans file data by extracting and cleaning the actual filename
 * from the file URL or path, preserving the original fileUrl
 * @param file File data object
 * @returns File data with cleaned display filename
 */
export function cleanFileData(file: FileDto): FileDto {
  if (!file) return file;
  return {
    ...file,
    fileName: removeUuidPrefix(file.fileName),
  };
}
