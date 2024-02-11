import { Container, Text, TextInput, Title } from "@mantine/core";
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

  const throttledText = useDebounce(text, 250);
  const { data, isPending, isFetching, isError } = useQuery({
    queryKey: ["directory", throttledText],
    queryFn: async () => {
      return await invoke<string>("greet", { name: throttledText });
    },
    staleTime: 1000,
    placeholderData: keepPreviousData,
  });

  return (
    <Container>
      <Title>Iterate over a directory</Title>

      <TextInput
        label="Folder"
        value={text}
        onChange={(event) => setText(event.currentTarget.value)}
      />

      {isPending ? (
        <>
          <p>Loading...</p>
        </>
      ) : (
        <>
          <pre style={{ opacity: isFetching ? 0.5 : 1 }}>{data}</pre>
        </>
      )}

      {isError && <Text c="red">Error fetching data</Text>}
    </Container>
  );
}
