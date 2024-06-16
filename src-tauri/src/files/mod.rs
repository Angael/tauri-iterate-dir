use std::fs;
use std::path::Path;
// use crate::folders::{get_cache_dir, get_data_dir};

mod file_struct;

#[tauri::command]
pub fn list_files(dir: String) -> Result<Vec<file_struct::FileInList>, String> {
    let mut files = vec![];

    let entries = fs::read_dir(dir);
    if entries.is_err() {
        return Err("Error reading directory".to_string());
    }
    for entry in entries.unwrap() {
        let entry = entry.expect("Error reading entry");
        let path = entry.path();
        let path_str = path.to_str().unwrap().to_string();

        let is_file = path.is_file();
        let is_dir = path.is_dir();

        files.push(file_struct::FileInList::new(path_str, is_file, is_dir));
    }
    Ok(files)
}

#[tauri::command]
pub fn delete_file(path: String) -> Result<(), String> {
    let path = Path::new(&path);
    if path.is_file() {
        fs::remove_file(path).map_err(|e| e.to_string())?;
    } else if path.is_dir() {
        fs::remove_dir_all(path).map_err(|e| e.to_string())?;
    } else {
        return Err("Path is not a file or directory".to_string());
    }
    Ok(())
}

#[tauri::command]
pub fn optimize_files_in_dir(app_handle: tauri::AppHandle, path: String) -> String {
    println!("Optimizing files in directory: {}", path);
    let path_resolver = app_handle.path_resolver();
    let cache_dir = path_resolver
        .app_cache_dir()
        .unwrap()
        .to_str()
        .unwrap()
        .to_string();

    println!("Cache dir: {}", cache_dir);

    cache_dir
}
