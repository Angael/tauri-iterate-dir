import { FileInList } from "../../../../types/FileInList.type";
import parsePath from "../../../../utils/parsePath";
import { fileToIcon } from "../../fileToIcon";
import DefaultTileItemView from "./DefaultTileItemView";
import ImgTileItemView from "./ImgTileItemView";
import css from "./TileItem.module.css";
import VideoTileItemView from "./VideoTileItemView";
import { FileType, getFileType } from "../../../../utils/getFileType.ts";
import { memo } from "react";

type Props = {
  file: FileInList;
  onClick: (file: FileInList) => void;
};

const TileItem = ({ file, onClick }: Props) => {
  const fileType = getFileType(file.path);
  const Icon = fileToIcon(file);
  const { base } = parsePath(file.path);

  return (
    <div className={css.tileItem} onClick={() => onClick(file)}>
      {fileType === undefined && (
        <DefaultTileItemView Icon={Icon} label={base} />
      )}

      {fileType === FileType.Image && (
        <ImgTileItemView file={file} label={base} />
      )}
      {fileType === FileType.Video && (
        <VideoTileItemView file={file} label={base} />
      )}
    </div>
  );
};

export default memo(TileItem);
