import { Container, Text, TextInput, Title } from "@mantine/core";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { Store, useStore } from "@tanstack/react-store";
import { invoke } from "@tauri-apps/api/tauri";
import { useDebounce } from "@uidotdev/usehooks";
import FileList from "../components/file-list/FileList";
import type { File } from "../components/file-list/File.type";

export const Route = createLazyFileRoute("/")({
  component: Index
});

export const pathStore = new Store("/");

function Index() {
  const pathInput = useStore(pathStore);

  // eslint-disable-next-line no-unused-vars
  const throttledText = useDebounce(pathInput, 250);

  const dir = useQuery({
    queryKey: ["list_files", throttledText],
    queryFn: async () => {
      return await invoke<File[]>("list_files", { dir: throttledText });
    },
    staleTime: 1000,
    placeholderData: keepPreviousData,
    retry: 2,
    retryDelay: 1000
  });

  console.log(dir.data);

  return (
    <Container>
      <Title>Iterate over a directory</Title>

      <TextInput
        label="Folder"
        value={pathInput}
        onChange={(event) =>
          pathStore.setState((_) => event.currentTarget.value)
        }
        error={
          dir.failureCount > 0
            ? `Can't read directory. ${dir.failureCount}/3 times. ${dir.error || ""}`
            : ""
        }
      />

      {dir.isPending && <Text>Loading...</Text>}
      {dir.isError && <Text c="red">Error: {dir.error?.message}</Text>}

      {dir.data && (
        <FileList
          paths={dir.data}
          onClickPath={(path) => pathStore.setState((_) => path)}
        />
      )}
    </Container>
  );
}
