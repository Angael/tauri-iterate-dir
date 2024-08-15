import { FileListProps } from "../FileList.tsx";
import { useVirtualizer, useWindowVirtualizer } from "@tanstack/react-virtual";
import { Fragment, memo, useLayoutEffect, useRef } from "react";
import TileItem from "../item-views/tile-item/TileItem.tsx";

const columnWidth = 450;
// const rowHeight = 450;
// const gutter = 16;

type Props = { width: number; seenList: string[] } & FileListProps;

const MyVirtualizedFileGrid = ({
  paths,
  width,
  seenList,
  onClickPath,
  onDelete,
}: Props) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const columnCount = Math.floor(width / columnWidth);
  const actualColumnWidth = width / columnCount;
  const actualHeight = actualColumnWidth * 1.1;

  const rowVirtualizer = useWindowVirtualizer({
    count: Math.ceil(paths.length / columnCount),
    estimateSize: () => actualHeight,
    overscan: 5,
    scrollMargin: parentRef.current?.offsetTop ?? 0,
    // gap: 16,
  });

  const columnVirtualizer = useVirtualizer({
    horizontal: true,
    count: columnCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => actualColumnWidth,
    overscan: 5,
    // gap: 16,
  });

  useLayoutEffect(() => {
    rowVirtualizer.measure();
    columnVirtualizer.measure();
  }, [width]);

  return (
    <>
      <div ref={parentRef} style={{ width }}>
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

                console.log(virtualColumn);

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
                      width: virtualColumn.size,
                      height: virtualRow.size,
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
