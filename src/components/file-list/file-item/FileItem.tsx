import { NavLink } from "@mantine/core";
import { File } from "../File.type";
import { IconFile, IconFolder } from "@tabler/icons-react";
import { convertFileSrc } from "@tauri-apps/api/tauri";

type Props = {
  file: File;
  onClick: (file: File) => void;
};

const FileItem = ({ file, onClick }: Props) => {
  const isImg = file.path.match(/\.(jpeg|jpg|gif|png|svg|webp)$/i);

  return (
    <NavLink
      key={file.path}
      onClick={() => onClick(file)}
      label={file.path}
      c={file.isDir ? "yellow.1" : isImg ? "red" : "gray"}
      style={{}}
      leftSection={
        file.isDir ? (
          <IconFolder />
        ) : isImg ? (
          <img src={convertFileSrc(file.path)} alt="" />
        ) : (
          <IconFile />
        )
      }
    />
  );
};

export default FileItem;
