import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('proesporte.db');

export default db;