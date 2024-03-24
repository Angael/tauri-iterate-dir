import { Stack } from "@mantine/core";
import { DisplayMode } from "../display-mode/DisplayModeToggle";
import type { FileInList } from "../../types/FileInList.type";
import css from "./FileList.module.css";
import NavLinkItem from "./item-views/NavLinkItem";
import TileItem from "./item-views/TileItem";

type Props = {
  paths: FileInList[];
  onClickPath: (path: FileInList) => void;
  displayMode: keyof typeof DisplayMode;
};

const gridSizes = {
  grid_sm: "250px",
  grid_lg: "400px"
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

  if (displayMode === "grid_sm" || displayMode === "grid_lg") {
    return (
      <div
        className={css.itemGrid}
        style={{ "--grid-size": gridSizes[displayMode] } as any}
      >
        {sortedPaths.map((file) => (
          <TileItem file={file} onClick={onClickPath} />
        ))}
      </div>
    );
  }

  return (
    <Stack gap={1}>
      {sortedPaths.map((file) => (
        <NavLinkItem file={file} onClick={onClickPath} />
      ))}
    </Stack>
  );
};

export default FileList;
