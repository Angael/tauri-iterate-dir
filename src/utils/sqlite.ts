import Database from "tauri-plugin-sql-api";

export const sqlite = await Database.load("sqlite:test.db");
