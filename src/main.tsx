import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css";

const queryClient = new QueryClient();

// Your theme configuration is merged with default theme
const theme = createTheme({
  fontFamily: "Montserrat, sans-serif",
  defaultRadius: "md"
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme} defaultColorScheme="dark">
        <App />
      </MantineProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
