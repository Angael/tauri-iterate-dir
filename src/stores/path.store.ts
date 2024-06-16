import { createStoreWithLocalStorage } from "./storeUtils.ts";

const pathStore = createStoreWithLocalStorage(
  "path",
  "I:/OneDrive/Pictures/camille-test",
);

export default pathStore;
