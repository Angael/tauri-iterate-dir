import { Store, useStore } from "@tanstack/react-store";
import { useEffect, useRef } from "react";
import { useDebouncedCallback } from "use-debounce";

export const usePathInput = (store: Store<string>) => {
  const path = useStore(store);

  const setPathDebounced = useDebouncedCallback(
    (_path: string) => {
      store.setState((_) => _path || "/");
    },
    250,
    { leading: false }
  );

  const setPath = (path: string) => {
    setPathDebounced(path);
    setPathDebounced.flush();
  };

  const goBack = () => {
    const normalizedPath = path.replaceAll("\\", "/");
    setPath(normalizedPath.split("/").slice(0, -1).join("/"));
  };

  // Fix uncontrolled inputs
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = path ?? "";
    }
  }, [path]);

  return { path, setPath, setPathDebounced, goBack, inputRef };
};
