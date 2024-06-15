import { IconFolder, IconFile, IconPhoto, IconTxt } from "@tabler/icons-react";
import { FileInList } from "../../types/FileInList.type";
import mime from "mime";

export const fileToIcon = (file: FileInList) => {
  if (file.isDir) {
    return IconFolder;
  }

  const type = mime.getType(file.path);

  if (type?.includes("text/plain")) {
    return IconTxt;
  } else if (type?.includes("image")) {
    return IconPhoto;
  } else {
    return IconFile;
  }
};
