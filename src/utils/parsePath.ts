type ParsedPath = {
  root: string; //"/";
  dir: string; //"/home/user/dir";
  base: string; //"file.txt";
  ext: string; //".txt";
  name: string; //"file";
};

// Copilot wrote this code
const parsePath = (path: string): ParsedPath => {
  const match = path.match(/^(.*\/)?([^/]*)$/);
  if (!match) {
    throw new Error(`Failed to parse path: ${path}`);
  }
  const [, dir = "", base = ""] = match;
  const extMatch = base.match(/^(.*?)(\.[^.]*)?$/);
  if (!extMatch) {
    throw new Error(`Failed to parse extension: ${base}`);
  }
  const [, name = "", ext = ""] = extMatch;
  return {
    root: "/",
    dir,
    base,
    ext,
    name
  };
};

export default parsePath;
