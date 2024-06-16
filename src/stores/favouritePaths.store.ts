import { Store } from "@tanstack/react-store";
import { sqlite } from "../utils/sqlite.ts";

const favouritePathsStore = new Store<string[]>([]);

const res = (await sqlite.select("SELECT * FROM test")) as any;
favouritePathsStore.setState(() => res.map((row: any) => row.name));

export default favouritePathsStore;
