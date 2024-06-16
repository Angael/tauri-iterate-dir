import { Store } from "@tanstack/react-store";

const initialPath =
  localStorage.getItem("path") || "I:/OneDrive/Pictures/camille-test";

const pathStore = new Store(initialPath);

export default pathStore;

pathStore.subscribe(() => {
  console.log("Path changed", pathStore.state);
  localStorage.setItem("path", pathStore.state);
});
