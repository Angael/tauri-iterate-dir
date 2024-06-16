import { Group, Text } from "@mantine/core";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useStore } from "@tanstack/react-store";
import { invoke } from "@tauri-apps/api/tauri";
import { useEffect } from "react";
import FileList from "../components/file-list/FileList";
import displayModeStore from "../stores/displayMode.store";
import pathStore from "../stores/path.store";
import type { FileInList } from "../types/FileInList.type";
import { usePathInput } from "../utils/usePathInput";
import ActionBar from "../components/action-bar/ActionBar.tsx";
import FileModal from "../components/file-modal/FileModal.tsx";
import openFileStore from "../stores/openFile.store.ts";
import Favourites from "../components/favourites/Favourites.tsx";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const { path, setPath } = usePathInput(pathStore);
  const displayMode = useStore(displayModeStore);

  useEffect(() => {
    (async () => {
      const result = await invoke("optimize_files_in_dir", { path });
      console.log(result);
    })();
  }, [path]);

  const dir = useQuery({
    queryKey: ["list_files", path],
    queryFn: async () => {
      return await invoke<FileInList[]>("list_files", { dir: path });
    },
    placeholderData: keepPreviousData,
    retry: false,
    retryDelay: 1000,
  });

  const onClickPath = (file: FileInList) => {
    if (file.isDir) {
      setPath(file.path);
    } else {
      console.log("Open file", file.path);
      openFileStore.setState((_) => ({ isOpen: true, file }));
    }
  };

  return (
    <>
      <ActionBar hasPathError={!!dir.error} />

      {dir.isPending && <Text>Loading...</Text>}

      <Group align="flex-start">
        <Favourites />

        {dir.data && (
          <FileList
            paths={dir.data}
            onClickPath={onClickPath}
            displayMode={displayMode}
          />
        )}
      </Group>

      <FileModal />
    </>
  );
}
