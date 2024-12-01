import { useQuery, useQueryClient } from "@tanstack/react-query";
import { sqlite } from "../../utils/sqlite.ts";
import { useCallback } from "react";

export const useSeen = () =>
  useQuery({
    initialData: [],
    queryKey: ["seen"],
    queryFn: async () => {
      const rows =
        await sqlite.select<{ path: string }[]>("SELECT * FROM seen");

      return rows.map((row: any) => row.path);
    },
    retry: false,
  });

export const useAddSeen = () => {
  const queryClient = useQueryClient();

  return useCallback(
    async (path: string) => {
      try {
        await sqlite.execute(`INSERT INTO seen (path) VALUES (?)`, [path]);
        await queryClient.setQueryData(["seen"], (oldData: string[]) => {
          return [...oldData, path];
        });
      } catch (e) {
        console.log("Error adding path to seen, possibly already exists", e);
      }
    },
    [queryClient],
  );
};
