import { FileListProps } from "../FileList.tsx";
import { useVirtualizer, useWindowVirtualizer } from "@tanstack/react-virtual";
import { Fragment, useRef } from "react";
import TileItem from "../item-views/tile-item/TileItem.tsx";

const columnWidth = 450;
const rowHeight = 450;
const gutter = 16;

type Props = { width: number } & FileListProps;
const MyVirtualizedFileGrid = ({
  paths,
  width,
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
      <div ref={parentRef} style={{ width: width, overflow: "auto" }}>
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
                      top: 0,
                      left: 0,
                      width: `${virtualColumn.size}px`,
                      height: `${virtualRow.size}px`,
                      transform: `translateX(${virtualColumn.start}px) translateY(${virtualRow.start}px)`,
                    }}
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

export default MyVirtualizedFileGrid;
