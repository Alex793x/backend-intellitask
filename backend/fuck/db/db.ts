import { SQLDatabase } from 'encore.dev/storage/sqldb';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema';

const DB = new SQLDatabase('agentsDb', {
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
