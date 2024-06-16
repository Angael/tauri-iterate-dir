import css from "./ActionBar.module.css";
import {
  ActionIcon,
  Burger,
  Button,
  Flex,
  Group,
  TextInput,
} from "@mantine/core";
import Icon from "@mdi/react";
import { mdiArrowLeft, mdiHome, mdiStar } from "@mdi/js";
import DisplayModeToggle from "../display-mode/DisplayModeToggle.tsx";
import displayModeStore from "../../stores/displayMode.store.ts";
import { usePathInput } from "../../utils/usePathInput.ts";
import pathStore from "../../stores/path.store.ts";
import { useStore } from "@tanstack/react-store";
import { sqlite } from "../../utils/sqlite.ts";
import { useFavourites } from "../favourites/useFavourites.ts";
import showFavouritesStore from "../../stores/showFavourites.store.ts";
import { memo } from "react";

type Props = {
  hasPathError: boolean;
};

const ActionBar = ({ hasPathError }: Props) => {
  const { path, setPath, setPathDebounced, goBack, inputRef } =
    usePathInput(pathStore);
  const displayMode = useStore(displayModeStore);
  const showFavs = useStore(showFavouritesStore);

  const favouritesQuery = useFavourites();

  const currentPathIsFavourite =
    favouritesQuery.data?.some((row: any) => row.name === path) ?? false;

  const addToFavourites = async () => {
    if (currentPathIsFavourite) {
      await sqlite.execute(`DELETE FROM test WHERE name = ?`, [path]);
    } else {
      await sqlite.execute(`INSERT INTO test (name) VALUES (?)`, [path]);
    }
    await favouritesQuery.refetch();
  };

  return (
    <nav className={css.actionBarBg}>
      <Group className={css.actionBar} gap="sm" h="80px">
        <Burger
          opened={showFavs}
          onClick={() => showFavouritesStore.setState((prev) => !prev)}
          aria-label="Toggle menu"
        />

        <Button
          leftSection={<Icon path={mdiHome} size={1} />}
          variant="transparent"
          onClick={() => setPath("/")}
          style={{ flexShrink: 0 }}
        >
          Home
        </Button>

        <ActionIcon aria-label="Go back" variant="transparent" onClick={goBack}>
          <Icon path={mdiArrowLeft} size={1} />
        </ActionIcon>

        {/*<Autocomplete*/}
        {/*  label="Your favorite library"*/}
        {/*  placeholder="Pick value or enter anything"*/}
        {/*  data={["React", "Angular", "Vue", "Svelte"]}*/}
        {/*/>*/}

        <TextInput
          placeholder="Folder"
          ref={inputRef}
          defaultValue={path}
          onChange={(event) => setPathDebounced(event.currentTarget.value)}
          error={hasPathError}
        />

        <ActionIcon
          aria-label="Favourite"
          variant="transparent"
          color={currentPathIsFavourite ? "primary" : "dark"}
          disabled={!favouritesQuery.isFetched}
          onClick={addToFavourites}
        >
          <Icon path={mdiStar} size={1} />
        </ActionIcon>

        <Flex ml="auto">
          <DisplayModeToggle
            value={displayMode}
            setValue={(val) => displayModeStore.setState(() => val)}
          />
        </Flex>
      </Group>
    </nav>
  );
};

export default memo(ActionBar);
