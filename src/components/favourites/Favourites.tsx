import { useFavourites } from "./useFavourites.ts";
import pathStore from "../../stores/path.store.ts";
import { Paper, Stack, Title } from "@mantine/core";
import css from "./Favourites.module.css";
import { useStore } from "@tanstack/react-store";
import showFavouritesStore from "../../stores/showFavourites.store.ts";
import FavouritePath from "./FavouritePath.tsx";
import { sqlite } from "../../utils/sqlite.ts";

type Props = {};

const Favourites = (_props: Props) => {
  const favouritesQuery = useFavourites();
  const showFavorites = useStore(showFavouritesStore);

  const removeFavourite = async (path: string) => {
    await sqlite.execute(`DELETE FROM test WHERE name = ?`, [path]);
    await favouritesQuery.refetch();
  };

  if (!showFavorites) {
    return null;
  }

  return (
    <Paper bg="dark.6" className={css.Favourites} p="md">
      <Stack gap={0}>
        <Title order={3}>Favourites</Title>
        {favouritesQuery.data?.map((file) => (
          <FavouritePath
            key={file.name}
            folderPath={file.name}
            onClick={() => {
              pathStore.setState((_) => file.name);
            }}
            onRemove={removeFavourite}
          />
        ))}
      </Stack>
    </Paper>
  );
};

export default Favourites;
