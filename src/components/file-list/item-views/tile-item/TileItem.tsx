import { convertFileSrc } from "@tauri-apps/api/tauri";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import { FileInList } from "../../../../types/FileInList.type";
import { fileToIcon } from "../../fileToIcon";
import css from "./TileItem.module.css";
import parsePath from "../../../../utils/parsePath";
import DefaultTileItemView from "./DefaultTileItemView";

type Props = {
  file: FileInList;
  onClick: (file: FileInList) => void;
};

const TileItem = ({ file, onClick }: Props) => {
  const [ref, entry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: "200px"
  });
  const isImg = file.path.match(/\.(jpeg|jpg|gif|png|svg|webp)$/i);
  const isVideo = file.path.match(/\.(mp4|webm|ogg)$/i);

  const src = entry?.isIntersecting ? convertFileSrc(file.path) : "";

  const Icon = fileToIcon(file);
  const { base } = parsePath(file.path);

  return (
    <div className={css.tileItem} ref={ref} onClick={() => onClick(file)}>
      {file.isDir ? (
        <DefaultTileItemView Icon={Icon} label={base} />
      ) : (
        <div className={css.previewWrapper}>
          {!isImg && !isVideo && <Icon />}
          {isImg && <img src={src} alt="" className={css.img} />}
          {isVideo && <video src={src} controls className={css.video} />}{" "}
        </div>
      )}
    </div>
  );
};

export default TileItem;
