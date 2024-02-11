import { Container, List, TextInput, Title } from "@mantine/core";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { invoke } from "@tauri-apps/api/tauri";
import { useDebounce } from "@uidotdev/usehooks";
import { useState } from "react";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const [text, setText] = useState("Teścik");

  // eslint-disable-next-line no-unused-vars
  const throttledText = useDebounce(text, 250);

  const dir = useQuery({
    queryKey: ["list_files", text],
    queryFn: async () => {
      return await invoke<string[]>("list_files", { dir: text });
    },
    staleTime: 1000,
    placeholderData: keepPreviousData,
  });

  console.log({ dir });

  return (
    <Container>
      <Title>Iterate over a directory</Title>

      <TextInput
        label="Folder"
        value={text}
        onChange={(event) => setText(event.currentTarget.value)}
      />

      <List>
        {dir.isPending && <List.Item>Loading...</List.Item>}
        {dir.isError && <List.Item>Error: {dir.error.message}</List.Item>}
        {dir.data?.map((file) => <List.Item key={file}>{file}</List.Item>)}
      </List>
    </Container>
  );
}
