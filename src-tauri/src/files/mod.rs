use std::fs;

#[tauri::command]
pub fn list_files(dir: String) -> Result<Vec<String>, ()> {
    let mut files = vec![];
    
    let entries = fs::read_dir(dir);
    if entries.is_err() {
        return Err(());
    }
    for entry in entries.unwrap() {
        let entry = entry.unwrap();
        let path = entry.path();
        let path_str = path.to_str().unwrap().to_string();
        files.push(path_str);
    }
    Ok(files)
}