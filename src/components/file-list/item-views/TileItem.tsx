import { File } from "../File.type";
import { IconFile, IconFolder } from "@tabler/icons-react";
import { convertFileSrc } from "@tauri-apps/api/tauri";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import css from "./TileItem.module.css";

type Props = {
  file: File;
  onClick: (file: File) => void;
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

  return (
    <div className={css.tileItem} ref={ref} onClick={() => onClick(file)}>
      <div className={css.previewWrapper}>
        {file.isDir ? (
          <>
            <IconFolder />
            <p>{file.path}</p>
          </>
        ) : (
          <>
            {!isImg && !isVideo && <IconFile />}
            {isImg && <img src={src} alt="" className={css.img} />}
            {isVideo && <video src={src} controls className={css.video} />}
          </>
        )}
      </div>
    </div>
  );
};

export default TileItem;
