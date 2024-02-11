use std::fs;

#[tauri::command]
pub fn list_files(dir: String) -> Vec<String> {
    let mut files = vec![];
    for entry in fs::read_dir(dir).unwrap() {
        let entry = entry.unwrap();
        let path = entry.path();
        let path_str = path.to_str().unwrap().to_string();
        files.push(path_str);
    }
    files
}