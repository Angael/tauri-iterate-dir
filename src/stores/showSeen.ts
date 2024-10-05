import { Store } from "@tanstack/react-store";

export type SeenMode = "showUnseen" | "showSeen" | "showAll";

const showSeenStore = new Store<SeenMode>("showUnseen");

export default showSeenStore;
