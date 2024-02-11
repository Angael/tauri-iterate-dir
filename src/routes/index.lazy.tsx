import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  Button,
  Container,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useDebounce } from "@uidotdev/usehooks";

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

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO
  };

  return (
    <Container>
      <Title>Iterate over a directory</Title>

      <form onSubmit={onSubmit}>
        <Stack>
          <TextInput
            label="Folder"
            value={text}
            onChange={(event) => setText(event.currentTarget.value)}
          />
          <Button type="submit">Greet</Button>
        </Stack>
      </form>

      {throttledText}

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
