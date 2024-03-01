import { Button, Flex, Modal, Text, TextInput, Title } from "@mantine/core";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { Store, useStore } from "@tanstack/react-store";
import { invoke } from "@tauri-apps/api/tauri";
import type { File } from "../components/file-list/File.type";
import FileList from "../components/file-list/FileList";
import { usePathInput } from "../utils/usePathInput";
import DisplayModeToggle, {
  DisplayMode
} from "../components/display-mode/DisplayModeToggle";
import { useState } from "react";
import TileItem from "../components/file-list/item-views/TileItem";

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
    <div>
      <Title>Iterate over a directory</Title>

      <Flex gap={16} align="flex-end" justify="flex-start">
        <Button onClick={() => setPath("/")}>Home</Button>
        <Button onClick={goBack}>Back</Button>
        <DisplayModeToggle
          value={displayMode}
          setValue={(val) => displayModeStore.setState(() => val)}
        />
        <TextInput
          label="Folder"
          ref={inputRef}
          defaultValue={path}
          onChange={(event) => setPathDebounced(event.currentTarget.value)}
          error={
            dir.failureCount > 0
              ? `Can't read directory. ${dir.failureCount}/3 times. ${dir.error || ""}`
              : ""
          }
        />
      </Flex>

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
    </div>
  );
}
