import { NavLink } from "@mantine/core";
import { FileInList } from "../../../types/FileInList.type";
import { fileToIcon } from "../fileToIcon";
import parsePath from "../../../utils/parsePath";
import { memo } from "react";

type Props = {
  file: FileInList;
  onClick: (file: FileInList) => void;
};

const NavLinkItem = ({ file, onClick }: Props) => {
  const Icon = fileToIcon(file);
  const { base } = parsePath(file.path);
  return (
    <NavLink
      onClick={() => onClick(file)}
      label={base}
      c={file.isDir ? "yellow.1" : "gray"}
      leftSection={<Icon />}
      p={"xs"}
    />
  );
};

export default memo(NavLinkItem);
