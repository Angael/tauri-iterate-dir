// TODO: remove this file
use tauri::{api::path, PathResolver};

const PREFIX: &str = "/camille-app";

pub fn get_cache_dir() -> String {
    let _path = PathResolver::app_cache_dir();
    _path.unwrap().to_str().unwrap_or("").to_string() + PREFIX
}

pub fn get_data_dir() -> String {
    let _path = PathResolver::app_data_dir();
    _path.unwrap().to_str().unwrap_or("").to_string() + PREFIX
}

pub fn create_dirs() {}
