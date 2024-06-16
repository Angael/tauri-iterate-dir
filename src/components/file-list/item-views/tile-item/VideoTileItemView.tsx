import { memo, useMemo } from "react";
import { Text } from "@mantine/core";
import css from "./VideoTileItemView.module.css";
import previewCss from "./PreviewTileItemView.module.css";
import { FileInList } from "../../../../types/FileInList.type";
import { convertFileSrc } from "@tauri-apps/api/tauri";
import Icon from "@mdi/react";
import { mdiPlay } from "@mdi/js";

type Props = {
  file: FileInList;
  label: string;
};

const VideoTileItemView = (props: Props) => {
  const { file, label } = props;

  const src = useMemo(() => convertFileSrc(file.path), [file.path]);

  return (
    <div className={previewCss.tileWrapper}>
      <video src={src} className={css.filePreviewVideo} controls={false} />
      <Text size="sm" className={previewCss.label}>
        {label}
      </Text>
      <Icon path={mdiPlay} size={"64px"} className={css.playIcon} />
    </div>
  );
};

export default memo(VideoTileItemView);
