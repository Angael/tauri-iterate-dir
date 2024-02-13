use std::fs;

#[tauri::command]
pub fn list_files(dir: String) -> Result<Vec<String>, String> {
    let mut files = vec![];
    
    let entries = fs::read_dir(dir);
    if entries.is_err() {
        return Err("Error reading directory".to_string());
    }
    for entry in entries.unwrap() {
        let entry = entry.expect("Error reading entry");
        let path = entry.path();
        let path_str = path.to_str().unwrap().to_string();
        files.push(path_str);
    }
    Ok(files)
}