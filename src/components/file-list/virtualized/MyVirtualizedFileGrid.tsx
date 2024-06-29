 import {FileListProps} from "../FileList.tsx";

const columnWidth = 450;
const defaultHeight = 450;
const gutter = 8;
const defaultWidth = columnWidth;


type Props = { width: number } & FileListProps;
const MyVirtualizedFileGrid = ({
  width: _,
  paths,
  onClickPath,
  onDelete,
}: Props) => {
  return (
  );
};

export default MyVirtualizedFileGrid;
