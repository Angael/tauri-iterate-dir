import { Modal } from "@mantine/core";
import openFileStore from "../../stores/openFile.store.ts";
import { useStore } from "@tanstack/react-store";
import { FileType, getFileType } from "../../utils/getFileType.ts";
import { convertFileSrc } from "@tauri-apps/api/tauri";
import css from "./FileModal.module.css";
import { memo } from "react";

const FileModal = () => {
  const openFile = useStore(openFileStore);
  const onClose = () =>
    openFileStore.setState((s) => ({ ...s, isOpen: false }));

  const fileType = getFileType(openFile.file?.path ?? "");

  const src = openFile.file ? convertFileSrc(openFile.file?.path) : "";

  return (
    <Modal
      opened={openFile.isOpen}
      onClose={onClose}
      // title="File"
      centered
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 8,
      }}
      withCloseButton={false}
      size={"xl"}
    >
      {fileType === FileType.Image && (
        <img className={css.ImgInModal} src={src} />
      )}
      {fileType === FileType.Video && (
        <video className={css.VideoInModal} autoPlay src={src} controls loop />
      )}
    </Modal>
  );
};

export default memo(FileModal);
