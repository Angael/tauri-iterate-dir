import { NavLink } from "@mantine/core";

type Props = {
  paths: string[];
  onClickPath: (path: string) => void;
};

const FileList = ({ paths, onClickPath }: Props) => {
  return paths.map((path) => (
    <NavLink key={path} onClick={() => onClickPath(path)} label={path} />
  ));
};

export default FileList;
