import { memo, useMemo } from "react";
import { Text } from "@mantine/core";
import css from "./ImgTileItemView.module.css";
import previewCss from "./PreviewTileItemView.module.css";
import { FileInList } from "../../../../types/FileInList.type";
import { convertFileSrc } from "@tauri-apps/api/tauri";
import clsx from "clsx";

type Props = {
  file: FileInList;
  label: string;
};

const ImgTileItemView = (props: Props) => {
  const { file, label } = props;

  const src = useMemo(() => convertFileSrc(file.path), [file.path]);

  return (
    <div className={clsx(previewCss.tileWrapper)}>
      <img
        src={src}
        loading="lazy"
        alt=""
        className={clsx(css.filePreviewImg, previewCss.animation)}
      />
      <Text size="sm" className={previewCss.label} title={label}>
        {label}
      </Text>
    </div>
  );
};

export default memo(ImgTileItemView);
