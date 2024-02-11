import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App";
import "./global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css";
import { routeTree } from "./routeTree.gen";
import { RouterProvider, createRouter } from "@tanstack/react-router";

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const queryClient = new QueryClient();

// Your theme configuration is merged with default theme
const theme = createTheme({
  primaryColor: "teal",
  fontFamily: "Montserrat, sans-serif",
  defaultRadius: "md",
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme} defaultColorScheme="dark">
        <RouterProvider router={router} />
      </MantineProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
