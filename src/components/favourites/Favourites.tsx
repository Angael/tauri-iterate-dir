import { useFavourites } from "./useFavourites.ts";
import NavLinkItem from "../file-list/item-views/NavLinkItem.tsx";
import pathStore from "../../stores/path.store.ts";
import { Paper, Stack, Title } from "@mantine/core";
import css from "./Favourites.module.css";
import { useStore } from "@tanstack/react-store";
import showFavouritesStore from "../../stores/showFavourites.store.ts";

type Props = {};

const Favourites = (_props: Props) => {
  const favouritesQuery = useFavourites();
  const showFavorites = useStore(showFavouritesStore);

  if (!showFavorites) {
    return null;
  }

  return (
    <Paper bg="dark.6" className={css.Favourites} p="md">
      <Stack gap={0}>
        <Title order={3}>Favourites</Title>
        {favouritesQuery.data?.map((file) => (
          <NavLinkItem
            key={file.name}
            file={{
              path: file.name,
              isFile: false,
              isDir: true,
            }}
            onClick={() => {
              pathStore.setState((_) => file.name);
            }}
          />
        ))}
      </Stack>
    </Paper>
  );
};

export default Favourites;
