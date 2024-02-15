use std::fs;

mod file_struct;



#[tauri::command]
pub fn list_files(dir: String) -> Result<Vec<file_struct::File>, String> {
    let mut files = vec![];
    
    // IF "" then special case, list /
    
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
         
        files.push(file_struct::File::new(path_str, is_file, is_dir));
    }
    Ok(files)
}