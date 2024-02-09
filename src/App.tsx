import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { useQuery } from "@tanstack/react-query";
import { TextInput, Title } from "@mantine/core";

function App() {
  const [text, setText] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["directory", text],
    queryFn: async () => {
      return (await invoke("greet", { name: text })) as string;
    }
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO
  };

  return (
    <div className="container">
      <Title>Iterate over a directory</Title>

      <form className="row" onSubmit={onSubmit}>
        <TextInput
          label="Folder"
          value={text}
          onChange={(event) => setText(event.currentTarget.value)}
        />
        <button type="submit">Greet</button>
      </form>

      <pre>{isLoading ? "Loading..." : isError ? "Error" : data}</pre>
    </div>
  );
}

export default App;
