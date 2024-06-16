import TileItem from "../file-list/item-views/tile-item/TileItem.tsx";
import { Modal } from "@mantine/core";
import openFileStore from "../../stores/openFile.store.ts";
import { useStore } from "@tanstack/react-store";

const FileModal = () => {
  const openFile = useStore(openFileStore);
  const onClose = () =>
    openFileStore.setState((s) => ({ ...s, isOpen: false }));

  return (
    <Modal
      opened={openFile.isOpen}
      onClose={onClose}
      title="File"
      centered
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
      size={"xl"}
    >
      {openFile.file && <TileItem file={openFile.file} onClick={() => {}} />}
    </Modal>
  );
};

export default FileModal;
