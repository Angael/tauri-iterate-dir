import { NavLink } from "@mantine/core";
import { FileInList } from "../../../types/FileInList.type";
import { fileToIcon } from "../FileToIcon";

type Props = {
  file: FileInList;
  onClick: (file: FileInList) => void;
};

const NavLinkItem = ({ file, onClick }: Props) => {
  const Icon = fileToIcon(file);
  return (
    <NavLink
      onClick={() => onClick(file)}
      label={file.path}
      c={file.isDir ? "yellow.1" : "gray"}
      leftSection={<Icon />}
    />
  );
};

export default NavLinkItem;
