import { Store } from "@tanstack/react-store";
import { FileInList } from "../types/FileInList.type.ts";

interface OpenFile {
  isOpen: boolean;
  file: FileInList | null;
}

const openFileStore = new Store<OpenFile>({
  isOpen: false,
  file: null,
});

export default openFileStore;
