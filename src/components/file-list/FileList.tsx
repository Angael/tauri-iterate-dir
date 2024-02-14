import { NavLink } from "@mantine/core";
import type { File } from "./File.type";
import { IconFolder, IconFile } from "@tabler/icons-react";

type Props = {
  paths: File[];
  onClickPath: (path: string) => void;
};

const FileList = ({ paths, onClickPath }: Props) => {
  const sortedPaths = paths.toSorted((a, b) => {
    if (a.isDir && !b.isDir) {
      return -1;
    }
    if (!a.isDir && b.isDir) {
      return 1;
    }
    return a.name.localeCompare(b.name);
  });

  return sortedPaths.map((file) => (
    <NavLink
      key={file.name}
      onClick={() => onClickPath(file.name)}
      label={file.name}
      c={file.isDir ? "yellow.1" : "gray"}
      style={{}}
      leftSection={file.isDir ? <IconFolder /> : <IconFile />}
    />
  ));
};

export default FileList;
