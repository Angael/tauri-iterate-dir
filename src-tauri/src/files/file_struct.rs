use serde::ser::SerializeStruct;

pub struct File {
    pub name: String,
    pub is_file: bool,
    pub is_dir: bool,
}

// impl serde
impl serde::Serialize for File {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        let mut state = serializer.serialize_struct("File", 3)?;
        state.serialize_field("name", &self.name)?;
        state.serialize_field("isFile", &self.is_file)?;
        state.serialize_field("isDir", &self.is_dir)?;
        state.end()
    }
    
}