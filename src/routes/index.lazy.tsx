import { Group, Text } from "@mantine/core";
import {
  keepPreviousData,
  useQuery,
  useQueryClient
} from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useStore } from "@tanstack/react-store";
import { invoke } from "@tauri-apps/api/tauri";
import { useCallback, useEffect } from "react";
import FileList from "../components/file-list/FileList";
import displayModeStore from "../stores/displayMode.store";
import pathStore from "../stores/path.store";
import type { FileInList } from "../types/FileInList.type";
import { usePathInput } from "../utils/usePathInput";
import ActionBar from "../components/action-bar/ActionBar.tsx";
import FileModal from "../components/file-modal/FileModal.tsx";
import openFileStore from "../stores/openFile.store.ts";
import Favourites from "../components/favourites/Favourites.tsx";
import { sqlite } from "../utils/sqlite.ts";
import showSeenStore from "../stores/showSeen.ts";

export const Route = createLazyFileRoute("/")({
  component: Index
});

function Index() {
  const { path, setPath } = usePathInput(pathStore);
  const displayMode = useStore(displayModeStore);
  const queryClient = useQueryClient();

  useEffect(() => {
    (async () => {
      const result = await invoke("optimize_files_in_dir", { path });
      console.log(result);
    })();
  }, [path]);

  const showSeen = useStore(showSeenStore);
  const dir = useQuery({
    queryKey: ["list_files", path, showSeen],
    queryFn: async () => {
      const rows =
        await sqlite.select<{ path: string }[]>("SELECT * FROM seen");

      const seenPaths = rows.map((row) => row.path);

      const fileList = await invoke<FileInList[]>("list_files", { dir: path });

      if (showSeen === "showAll") return fileList;

      if (showSeen === "showUnseen") {
        return fileList.filter(
          (file) => file.isDir || !seenPaths.includes(file.path)
        );
      } else {
        return fileList.filter(
          (file) => file.isDir || seenPaths.includes(file.path)
        );
      }
    },
    placeholderData: keepPreviousData,
    retry: false,
    retryDelay: 1000
  });

  const onClickPath = useCallback(
    (file: FileInList) => {
      if (file.isDir) {
        setPath(file.path);
      } else {
        openFileStore.setState((_) => ({ isOpen: true, file }));
      }
    },
    [setPath]
  );

  const onDelete = useCallback(
    async (file: FileInList) => {
      await sqlite.execute(`DELETE FROM seen WHERE path = ?`, [file.path]);

      await invoke("delete_file", { path: file.path });
      // TODO: remove from cache, because the file is deleted
      // dir.refetch();
    },
    [queryClient, path]
  );

  const onNext = useCallback(() => {
    if (!dir.data) return;
    const nextIndex = dir.data.findIndex(
      (file) => file.path === openFileStore.state.file?.path
    );
    if (nextIndex === -1) return;
    const nextFile = dir.data[nextIndex + 1];
    if (nextFile) {
      openFileStore.setState((_) => ({ isOpen: true, file: nextFile }));
    }
  }, [dir.data]);

  const onPrevious = useCallback(() => {
    if (!dir.data) return;
    const prevIndex = dir.data.findIndex(
      (file) => file.path === openFileStore.state.file?.path
    );
    if (prevIndex === -1) return;
    const prevFile = dir.data[prevIndex - 1];
    if (prevFile) {
      openFileStore.setState((_) => ({ isOpen: true, file: prevFile }));
    }
  }, [dir.data]);

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
            onDelete={onDelete}
            displayMode={displayMode}
          />
        )}
      </Group>

      <FileModal onPrev={onPrevious} onNext={onNext} onDelete={onDelete} />
    </>
  );
}
