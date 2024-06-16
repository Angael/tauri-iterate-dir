// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::{thread, time::Duration};

use tauri::Manager;
use tauri_plugin_sql::{Migration, MigrationKind};

// Usefull: https://stackoverflow.com/questions/26388861/how-can-i-include-a-module-from-another-file-from-the-same-project
mod files;

fn search(name: &str) -> Vec<String> {
    vec![
        name.to_string(),
        "result1".to_string(),
        "result2".to_string(),
    ]
}

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
async fn greet(name: &str) -> Result<String, ()> {
    let _name = name.to_string();
    let handle = thread::spawn(move || {
        thread::sleep(Duration::from_secs(1));
        search(&_name) // Pass a reference to the 'static string
    });
    Ok(handle.join().unwrap().join(" ").to_string())
}

fn main() {
    let migrations = vec![
        // Define your migrations here
        Migration {
            version: 1,
            description: "new_test_table",
            sql: "CREATE TABLE test (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT);",
            kind: MigrationKind::Up,
        },
    ];

    tauri::Builder::default()
        .setup(|app| {
            #[cfg(debug_assertions)]
            app.get_window("main").unwrap().open_devtools();

            let app_data_dir = app
                .path_resolver()
                .app_data_dir()
                .expect("missing app data dir");
            let app_cache_dir = app
                .path_resolver()
                .app_cache_dir()
                .expect("missing app cache dir");
            let app_log_dir = app
                .path_resolver()
                .app_log_dir()
                .expect("missing app log dir");

            std::fs::create_dir_all(&app_data_dir).expect("failed to create app data dir");
            std::fs::create_dir_all(&app_cache_dir).expect("failed to create cache dir");
            std::fs::create_dir_all(&app_log_dir).expect("failed to create cache dir");

            Ok(())
        })
        .plugin(
            tauri_plugin_sql::Builder::default()
                .add_migrations("sqlite:test.db", migrations)
                .build(),
        )
        .invoke_handler(tauri::generate_handler![
            greet,
            files::list_files,
            files::delete_file,
            files::optimize_files_in_dir
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
