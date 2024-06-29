import { FileInList } from "../../../../types/FileInList.type";
import parsePath from "../../../../utils/parsePath";
import { fileToIcon } from "../../fileToIcon";
import DefaultTileItemView from "./DefaultTileItemView";
import ImgTileItemView from "./ImgTileItemView";
import css from "./TileItem.module.css";
import VideoTileItemView from "./VideoTileItemView";
import { FileType, getFileType } from "../../../../utils/getFileType.ts";
import { HTMLAttributes, memo, useState } from "react";
import { mdiDelete } from "@mdi/js";
import { ActionIcon, Stack } from "@mantine/core";
import Icon from "@mdi/react";

type Props = HTMLAttributes<HTMLDivElement> & {
  file: FileInList;
  onClickFile: (file: FileInList) => void;
  onDelete: (file: FileInList) => void;
};

const TileItem = ({ file, onClickFile, onDelete, ...other }: Props) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const fileType = getFileType(file.path);
  const { base } = parsePath(file.path);

  const handleDeleteWithToast = async (file: FileInList) => {
    setIsDeleted(true);
    // set cache
    // show toast
    onDelete(file);
  };

  if (isDeleted) {
    return null;
  }

  return (
    <div
      className={css.tileItem}
      onMouseDown={() => onClickFile(file)}
      {...other}
    >
      {fileType === undefined && (
        <DefaultTileItemView Icon={fileToIcon(file)} label={base} />
      )}

      {fileType === FileType.Image && (
        <ImgTileItemView file={file} label={base} />
      )}
      {fileType === FileType.Video && (
        <VideoTileItemView file={file} label={base} />
      )}

      <Stack className={css.tileMenu}>
        <ActionIcon
          color="red"
          onMouseDown={async (e) => {
            e.stopPropagation();
            await handleDeleteWithToast(file);
          }}
        >
          <Icon path={mdiDelete} />
        </ActionIcon>
      </Stack>
    </div>
  );
};

export default memo(TileItem);
