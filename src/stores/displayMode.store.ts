import { Store } from "@tanstack/react-store";

export const DisplayMode = {
  list: "list",
  grid_sm: "grid_sm",
  grid_lg: "grid_lg",
  virtualized_grid: "virtualized_grid",
} as const;

const displayModeStore = new Store<keyof typeof DisplayMode>(DisplayMode.list);

export default displayModeStore;
