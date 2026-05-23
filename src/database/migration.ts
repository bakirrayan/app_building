import { SQLiteDatabase } from "expo-sqlite";

export async function migrateDbIfNeeded(db: SQLiteDatabase) {
  const DATABASE_VERSION = 1;
  
  const row = await db.getFirstAsync<{ user_version: number }>(
    'PRAGMA user_version'
  );
  const currentVersion = row?.user_version ?? 0;

  if (currentVersion >= DATABASE_VERSION) return; // already up to date

  if (currentVersion === 0) {
    // first time — create tables
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS contacts (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        phone TEXT NOT NULL,
        avatar TEXT NOT NULL
      );
    `);
  }

  /* if (currentVersion === 1) { /
    // existing users on version 1 — add new column
    await db.execAsync(`
      ALTER TABLE contacts ADD COLUMN email TEXT;
    `);
  } */

  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}