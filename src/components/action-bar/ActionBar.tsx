import css from "./ActionBar.module.css";
import { ActionIcon, Button, Flex, Group, TextInput } from "@mantine/core";
import Icon from "@mdi/react";
import { mdiArrowLeft, mdiHome, mdiMenu, mdiStar } from "@mdi/js";
import DisplayModeToggle from "../display-mode/DisplayModeToggle.tsx";
import displayModeStore from "../../stores/displayMode.store.ts";
import { usePathInput } from "../../utils/usePathInput.ts";
import pathStore from "../../stores/path.store.ts";
import { useStore } from "@tanstack/react-store";

type Props = {
  hasPathError: boolean;
};

const ActionBar = ({ hasPathError }: Props) => {
  const { path, setPath, setPathDebounced, goBack, inputRef } =
    usePathInput(pathStore);
  const displayMode = useStore(displayModeStore);

  return (
    <Group className={css.actionBar} gap="sm">
      <ActionIcon aria-label="Menu" variant="transparent">
        <Icon path={mdiMenu} size={1} />
      </ActionIcon>

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

      <ActionIcon aria-label="Favourite" variant="transparent">
        <Icon path={mdiStar} size={1} />
      </ActionIcon>

      <Flex ml="auto">
        <DisplayModeToggle
          value={displayMode}
          setValue={(val) => displayModeStore.setState(() => val)}
        />
      </Flex>
    </Group>
  );
};

export default ActionBar;
