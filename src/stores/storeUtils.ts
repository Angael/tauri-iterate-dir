import { Store } from "@tanstack/react-store";

type Transforms<T = string> = {
  save?: (value: T) => string;
  load?: (value: string | null) => T;
};

export const createStoreWithLocalStorage = <T>(
  key: string,
  initialValue: T,
  { save, load }: Transforms<T> = {},
) => {
  const value = load
    ? load(localStorage.getItem(key))
    : (localStorage.getItem(key) as T);

  const store = new Store<T>(value ?? initialValue);

  store.subscribe(() => {
    localStorage.setItem(
      key,
      save ? save(store.state) : (store.state as string),
    );
  });

  return store;
};
