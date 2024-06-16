import { ActionIcon, Group, NavLink } from "@mantine/core";
import Icon from "@mdi/react";
import { mdiClose, mdiStar } from "@mdi/js";
import parsePath from "../../utils/parsePath.ts";
import css from "./Favourites.module.css";

type Props = {
  folderPath: string;
  onClick: (file: string) => void;
  onRemove: (file: string) => void;
};

const FavouritePath = ({ folderPath, onClick, onRemove }: Props) => {
  const { base, dir } = parsePath(folderPath);

  return (
    <Group className={css.FavouritePath}>
      <NavLink
        variant="subtle"
        onClick={() => onClick(folderPath)}
        label={base}
        description={dir}
        c={"yellow.1"}
        leftSection={<Icon path={mdiStar} size={1} />}
        py={0}
        style={{ flex: 1 }}
        bg="transparent"
      />
      <ActionIcon
        onClick={() => onRemove(folderPath)}
        variant="transparent"
        c="red.1"
      >
        <Icon path={mdiClose} />
      </ActionIcon>
    </Group>
  );
};

export default FavouritePath;
