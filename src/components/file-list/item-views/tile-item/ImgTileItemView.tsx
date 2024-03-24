import { memo } from "react";
import { Text } from "@mantine/core";
import css from "./ImgTileItemView.module.css";
import { FileInList } from "../../../../types/FileInList.type";
import { convertFileSrc } from "@tauri-apps/api/tauri";
import { useIntersectionObserver } from "@uidotdev/usehooks";

type Props = {
  file: FileInList;
  label: string;
};

const ImgTileItemView = (props: Props) => {
  const { file, label } = props;
  const [ref, entry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: "200px"
  });

  const src = entry?.isIntersecting ? convertFileSrc(file.path) : "";

  return (
    <div className={css.tileWrapper}>
      <img src={src} alt="" className={css.filePreviewImg} ref={ref} />
      <Text size="xl" className={css.label}>
        {label}
      </Text>
    </div>
  );
};

export default memo(ImgTileItemView);
