import { useQuery } from "@tanstack/react-query";
import { sqlite } from "../../utils/sqlite.ts";

export const useFavourites = () =>
  useQuery({
    queryKey: ["favourites"],
    queryFn: async () =>
      sqlite.select<{ name: string }[]>("SELECT * FROM test"),
    retry: false,
  });
