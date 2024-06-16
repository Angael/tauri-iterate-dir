import { createStoreWithLocalStorage } from "./storeUtils.ts";

const showFavouritesStore = createStoreWithLocalStorage<boolean>(
  "showFavourites",
  false,
  {
    save: (val) => val.toString(),
    load: (val) => val === "true",
  },
);

export default showFavouritesStore;
