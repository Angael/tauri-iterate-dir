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
import { useDebounce } from "use-debounce";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const [text, setText] = useState("Teścik");

  const [debouncedText] = useDebounce(text, 500);
  const { data, isPending, isFetching, isError } = useQuery({
    queryKey: ["directory", debouncedText],
    queryFn: async () => {
      return await invoke<string>("greet", { name: debouncedText });
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
