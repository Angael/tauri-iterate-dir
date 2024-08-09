import { FileListProps } from "../FileList.tsx";
import { useVirtualizer, useWindowVirtualizer } from "@tanstack/react-virtual";
import { Fragment, memo, useRef } from "react";
import TileItem from "../item-views/tile-item/TileItem.tsx";

const columnWidth = 450;
const rowHeight = 450;
const gutter = 16;

type Props = { width: number; seenList: string[] } & FileListProps;
const MyVirtualizedFileGrid = ({
  paths,
  width,
  seenList,
  onClickPath,
  onDelete,
}: Props) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const columnCount = Math.floor(width / (columnWidth + gutter));
  const rowVirtualizer = useWindowVirtualizer({
    count: Math.ceil(paths.length / columnCount),
    estimateSize: () => rowHeight + gutter,
    overscan: 5,
    scrollMargin: parentRef.current?.offsetTop ?? 0,
  });

  const columnVirtualizer = useVirtualizer({
    horizontal: true,
    count: columnCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => columnWidth + gutter,
    overscan: 5,
  });

  return (
    <>
      <div ref={parentRef} style={{ width: width, overflow: "clip" }}>
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: `${columnVirtualizer.getTotalSize()}px`,
            position: "relative",
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => (
            <Fragment key={virtualRow.key}>
              {columnVirtualizer.getVirtualItems().map((virtualColumn) => {
                const file =
                  paths[virtualRow.index * columnCount + virtualColumn.index];

                if (!file) {
                  return <Fragment key={virtualColumn.key} />;
                }

                return (
                  <TileItem
                    key={file.path}
                    file={file}
                    onClickFile={onClickPath}
                    onDelete={onDelete}
                    style={{
                      position: "absolute",
                      top: virtualRow.start,
                      left: virtualColumn.start,
                      width: `${virtualColumn.size}px`,
                      height: `${virtualRow.size}px`,
                    }}
                    seen={seenList.includes(file.path)}
                  />
                );
              })}
            </Fragment>
          ))}
        </div>
      </div>
    </>
  );
};

export default memo(MyVirtualizedFileGrid);
