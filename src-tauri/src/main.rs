// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::{thread, time::Duration};

// Usefull: https://stackoverflow.com/questions/26388861/how-can-i-include-a-module-from-another-file-from-the-same-project
mod files;

fn search(name: &str) -> Vec<String> {
    vec![name.to_string(), "result1".to_string(), "result2".to_string()]
}

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
 async fn greet(name: &str) -> Result<String, ()>  {
    let _name = name.to_string();
    let handle = thread::spawn(move || {
        thread::sleep(Duration::from_secs(1));
        search(&_name) // Pass a reference to the 'static string
    });
    Ok(handle.join().unwrap().join(" ").to_string())
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, files::list_files])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
