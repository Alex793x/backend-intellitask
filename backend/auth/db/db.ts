import { drizzle } from 'drizzle-orm/node-postgres';

import { SQLDatabase } from 'encore.dev/storage/sqldb';
import * as schema from './schema';

export const DB = new SQLDatabase('authsDb', {
  migrations: {
    path: 'migrations',
    source: 'drizzle',
  },
});

// Initialize Drizzle ORM with the connection string
if (!DB.connectionString) {
  throw new Error('Failed to initialize database connection string');
}

// Initialize Drizzle ORM with the connection string
const db = drizzle(DB.connectionString, { schema });

export { db };
