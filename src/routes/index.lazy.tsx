import { Button, Modal, Text, TextInput } from "@mantine/core";
import { mdiArrowLeft, mdiHome } from "@mdi/js";
import Icon from "@mdi/react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { Store, useStore } from "@tanstack/react-store";
import { invoke } from "@tauri-apps/api/tauri";
import { useState } from "react";
import DisplayModeToggle, {
  DisplayMode
} from "../components/display-mode/DisplayModeToggle";
import type { File } from "../components/file-list/File.type";
import FileList from "../components/file-list/FileList";
import TileItem from "../components/file-list/item-views/TileItem";
import { usePathInput } from "../utils/usePathInput";
import css from "./index.module.css";

export const Route = createLazyFileRoute("/")({
  component: Index
});

const pathStore = new Store("/");
const displayModeStore = new Store<keyof typeof DisplayMode>(DisplayMode.list);

function Index() {
  const { path, setPath, setPathDebounced, goBack, inputRef } =
    usePathInput(pathStore);

  const displayMode = useStore(displayModeStore);
  const [openFile, setOpenFile] = useState<File | null>(null);

  const dir = useQuery({
    queryKey: ["list_files", path],
    queryFn: async () => {
      return await invoke<File[]>("list_files", { dir: path });
    },
    placeholderData: keepPreviousData,
    retry: 2,
    retryDelay: 1000
  });

  const onClickPath = (file: File) => {
    if (file.isDir) {
      setPath(file.path);
    } else {
      console.log("Open file", file.path);
      setOpenFile(file);
    }
  };

  return (
    <>
      <nav className={css.actionBar}>
        <Button
          leftSection={<Icon path={mdiHome} size={1} />}
          variant="light"
          onClick={() => setPath("/")}
        >
          Home
        </Button>
        <Button
          variant="transparent"
          onClick={goBack}
          leftSection={<Icon path={mdiArrowLeft} size={1} />}
        >
          Back
        </Button>
        <DisplayModeToggle
          value={displayMode}
          setValue={(val) => displayModeStore.setState(() => val)}
        />
        <TextInput
          placeholder="Folder"
          ref={inputRef}
          defaultValue={path}
          onChange={(event) => setPathDebounced(event.currentTarget.value)}
          error={
            dir.failureCount > 0
              ? `Can't read directory. ${dir.failureCount}/3 times. ${dir.error || ""}`
              : ""
          }
        />
      </nav>

      {dir.isPending && <Text>Loading...</Text>}
      {dir.isError && <Text c="red">Error: {dir.error?.message}</Text>}

      {dir.data && (
        <FileList
          paths={dir.data}
          onClickPath={onClickPath}
          displayMode={displayMode}
        />
      )}

      {openFile && (
        <Modal
          opened={!!openFile}
          onClose={() => setOpenFile(null)}
          title="File"
          centered
          overlayProps={{
            backgroundOpacity: 0.55,
            blur: 3
          }}
          size={"xl"}
        >
          <TileItem file={openFile} onClick={() => {}} />
        </Modal>
      )}
    </>
  );
}
