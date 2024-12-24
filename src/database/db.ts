import SQLite, { SQLiteDatabase } from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

const database_name = "TodoApp.db";
const database_version = "1.0";
const database_displayname = "Todo SQLite Database";
const database_size = 200000;

export const initDatabase = async (): Promise<SQLiteDatabase> => {
  let db: SQLiteDatabase;
  try {
    db = await SQLite.openDatabase(
      database_name,
      database_version,
      database_displayname,
      database_size
    );
    await db.executeSql(
      'CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, completed INTEGER);'
    );
    console.log("Database initialized");
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
  return db;
};

export default initDatabase;

