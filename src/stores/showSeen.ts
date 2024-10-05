import { Store } from "@tanstack/react-store";

export type SeenMode = "showUnseen" | "showSeen" | "showAll";

interface ShowSeen {
  showSeen: SeenMode;
}

const showSeenStore = new Store<ShowSeen>({
  showSeen: "showUnseen"
});

export default showSeenStore;
