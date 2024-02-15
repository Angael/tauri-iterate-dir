import { NavLink } from "@mantine/core";
import type { File } from "./File.type";
import { IconFolder, IconFile } from "@tabler/icons-react";

type Props = {
  paths: File[];
  onClickPath: (path: File) => void;
};

const FileList = ({ paths, onClickPath }: Props) => {
  const sortedPaths = paths.toSorted((a, b) => {
    if (a.isDir && !b.isDir) {
      return -1;
    }
    if (!a.isDir && b.isDir) {
      return 1;
    }
    return a.path.localeCompare(b.path);
  });

  return sortedPaths.map((file) => (
    <NavLink
      key={file.path}
      onClick={() => onClickPath(file)}
      label={file.path}
      c={file.isDir ? "yellow.1" : "gray"}
      style={{}}
      leftSection={file.isDir ? <IconFolder /> : <IconFile />}
    />
  ));
};

export default FileList;
