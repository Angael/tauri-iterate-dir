import { Button, Container, Flex, Text, TextInput, Title } from "@mantine/core";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { Store, useStore } from "@tanstack/react-store";
import { invoke } from "@tauri-apps/api/tauri";
import { useDebouncedCallback } from "use-debounce";
import type { File } from "../components/file-list/File.type";
import FileList from "../components/file-list/FileList";
import { useEffect, useRef } from "react";

export const Route = createLazyFileRoute("/")({
  component: Index
});

export const pathStore = new Store("/");

function Index() {
  const pathInput = useStore(pathStore);

  const dir = useQuery({
    queryKey: ["list_files", pathInput],
    queryFn: async () => {
      return await invoke<File[]>("list_files", { dir: pathInput });
    },
    placeholderData: keepPreviousData,
    retry: 2,
    retryDelay: 1000
  });

  const setPathDebounced = useDebouncedCallback(
    (path: string) => {
      console.log(1);
      pathStore.setState((_) => path);
    },
    250,
    { leading: false }
  );

  const setPathNow = (path: string) => {
    setPathDebounced(path);
    setPathDebounced.flush();
  };

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = pathInput ?? "";
    }
  }, [pathInput]);

  return (
    <Container>
      <Title>Iterate over a directory</Title>

      <Flex gap={16} align="flex-end" justify="flex-start">
        <Button onClick={() => setPathNow("/")}>Home</Button>
        <Button
          onClick={() =>
            setPathNow(pathInput.split(/[\\/]/).slice(0, -1).join("/"))
          }
        >
          Back
        </Button>
        <TextInput
          label="Folder"
          ref={inputRef}
          defaultValue={pathInput}
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

      {dir.data && <FileList paths={dir.data} onClickPath={setPathNow} />}
    </Container>
  );
}
