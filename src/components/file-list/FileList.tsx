import { SimpleGrid, Stack } from "@mantine/core";
import { DisplayMode } from "../display-mode/DisplayModeToggle";
import type { File } from "./File.type";
import FileItem from "./file-item/FileItem";

type Props = {
  paths: File[];
  onClickPath: (path: File) => void;
  displayMode: keyof typeof DisplayMode;
};

const FileList = ({ paths, onClickPath, displayMode }: Props) => {
  const sortedPaths = paths.toSorted((a, b) => {
    if (a.isDir && !b.isDir) {
      return -1;
    }
    if (!a.isDir && b.isDir) {
      return 1;
    }
    return a.path.localeCompare(b.path);
  });

  if (displayMode === "grid_sm") {
    return (
      <SimpleGrid cols={{ base: 2, sm: 3, md: 4, lg: 5 }}>
        {sortedPaths.map((file) => (
          <FileItem file={file} onClick={onClickPath} />
        ))}
      </SimpleGrid>
    );
  }

  return (
    <Stack gap={1}>
      {sortedPaths.map((file) => (
        <FileItem file={file} onClick={onClickPath} />
      ))}
    </Stack>
  );
};

export default FileList;
