import { NavLink } from "@mantine/core";
import { File } from "../File.type";
import { IconFile, IconFolder } from "@tabler/icons-react";

type Props = {
  file: File;
  onClick: (file: File) => void;
};

const NavLinkItem = ({ file, onClick }: Props) => {
  return (
    <NavLink
      onClick={() => onClick(file)}
      label={file.path}
      c={file.isDir ? "yellow.1" : "gray"}
      leftSection={file.isDir ? <IconFolder /> : <IconFile />}
    />
  );
};

export default NavLinkItem;
