import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App";
import "./global.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { createTheme, MantineProvider, virtualColor } from "@mantine/core";
import "@mantine/core/styles.css";
import { routeTree } from "./routeTree.gen";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { queryClient } from "./queryClient.ts";

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Your theme configuration is merged with default theme
const theme = createTheme({
  primaryColor: "teal",
  colors: {
    primary: virtualColor({
      name: "primary",
      light: "teal",
      dark: "teal",
    }),
  },
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
  </React.StrictMode>,
);
