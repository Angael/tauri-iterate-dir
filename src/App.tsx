import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { useQuery } from "@tanstack/react-query";
import { Button, Container, Stack, TextInput, Title } from "@mantine/core";
import { Layout } from "./Layout";

function App() {
  const [text, setText] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["directory", text],
    queryFn: async () => {
      return await invoke<string>("greet", { name: text });
    }
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO
  };

  return (
    <Layout>
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

        <pre>{isLoading ? "Loading..." : isError ? "Error" : data}</pre>
      </Container>
    </Layout>
  );
}

export default App;
