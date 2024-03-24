import { FileInList } from "../../../../types/FileInList.type";
import parsePath from "../../../../utils/parsePath";
import { fileToIcon } from "../../fileToIcon";
import DefaultTileItemView from "./DefaultTileItemView";
import ImgTileItemView from "./ImgTileItemView";
import css from "./TileItem.module.css";
import VideoTileItemView from "./VideoTileItemView";

type Props = {
  file: FileInList;
  onClick: (file: FileInList) => void;
};

const TileItem = ({ file, onClick }: Props) => {
  const isImg = file.path.match(/\.(jpeg|jpg|gif|png|svg|webp)$/i);
  const isVideo = file.path.match(/\.(mp4|webm|ogg)$/i);
  const Icon = fileToIcon(file);
  const { base } = parsePath(file.path);

  return (
    <div className={css.tileItem} onClick={() => onClick(file)}>
      {!isImg && !isVideo && <DefaultTileItemView Icon={Icon} label={base} />}

      {isImg && <ImgTileItemView file={file} label={base} />}
      {isVideo && <VideoTileItemView file={file} label={base} />}
    </div>
  );
};

export default TileItem;
