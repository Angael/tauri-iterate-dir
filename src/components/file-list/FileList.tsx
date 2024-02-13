import { NavLink } from "@mantine/core";
import type { File } from "./File.type";

type Props = {
  paths: File[];
  onClickPath: (path: string) => void;
};

const FileList = ({ paths, onClickPath }: Props) => {
  return paths.map((file) => (
    <NavLink
      key={file.name}
      onClick={() => onClickPath(file.name)}
      label={file.name}
      c={file.isDir ? "blue" : "gray"}
    />
  ));
};

export default FileList;
