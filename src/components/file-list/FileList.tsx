import { Stack } from "@mantine/core";
import type { FileInList } from "../../types/FileInList.type";
import css from "./FileList.module.css";
import NavLinkItem from "./item-views/NavLinkItem";
import TileItem from "./item-views/tile-item/TileItem";
import { DisplayMode } from "../../stores/displayMode.store";
import { memo } from "react";
import MyVirtualizedFileGrid from "./virtualized/MyVirtualizedFileGrid.tsx";
import { useElementSize } from "@mantine/hooks";
import { useSeen } from "./useSeen.ts";

export type FileListProps = {
  paths: FileInList[]; // bad name
  onClickPath: (path: FileInList) => void;
  onDelete: (file: FileInList) => void;
  displayMode: keyof typeof DisplayMode;
};

const gridSizes: Record<keyof typeof DisplayMode, string> = {
  grid_sm: "250px",
  grid_lg: "400px",
  virtualized_grid: "450px",
  list: "100%",
};

const FileList = (props: FileListProps) => {
  const { paths, onClickPath, onDelete, displayMode } = props;
  const { ref, width } = useElementSize();

  const seen = useSeen();

  return (
    <div
      ref={ref}
      style={
        {
          "--grid-size": gridSizes[displayMode],
          flex: 1,
          overflow: "clip",
        } as any
      }
    >
      {displayMode === "virtualized_grid" && (
        <MyVirtualizedFileGrid {...props} width={width} seenList={seen.data} />
      )}
      {(displayMode === "grid_sm" || displayMode === "grid_lg") && (
        <div className={css.itemGrid}>
          {paths.map((file) => (
            <TileItem
              key={file.path}
              file={file}
              onClickFile={onClickPath}
              onDelete={onDelete}
              seen={seen.data.includes(file.path)}
            />
          ))}
        </div>
      )}
      {displayMode === "list" && (
        <Stack gap={1}>
          {paths.map((file) => (
            <NavLinkItem key={file.path} file={file} onClick={onClickPath} />
          ))}
        </Stack>
      )}
    </div>
  );
};

export default memo(FileList);
