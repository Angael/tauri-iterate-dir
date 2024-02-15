import { Button, Flex, Text, TextInput, Title } from "@mantine/core";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { Store } from "@tanstack/react-store";
import { invoke } from "@tauri-apps/api/tauri";
import type { File } from "../components/file-list/File.type";
import FileList from "../components/file-list/FileList";
import { usePathInput } from "../utils/usePathInput";

export const Route = createLazyFileRoute("/")({
  component: Index
});

export const pathStore = new Store("/");

function Index() {
  const { path, setPath, setPathDebounced, goBack, inputRef } =
    usePathInput(pathStore);

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
    }
  };

  return (
    <div>
      <Title>Iterate over a directory</Title>

      <Flex gap={16} align="flex-end" justify="flex-start">
        <Button onClick={() => setPath("/")}>Home</Button>
        <Button onClick={goBack}>Back</Button>
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

      {dir.data && <FileList paths={dir.data} onClickPath={onClickPath} />}
    </div>
  );
}
