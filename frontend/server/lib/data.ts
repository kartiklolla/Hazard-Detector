import fs from "fs";
import path from "path";

// data files live in the sibling `server/data` directory (one level up from lib)
const dataDir = path.resolve(import.meta.dirname, "..", "data");

export async function readJsonFile<T = any>(filename: string): Promise<T> {
  const fp = path.join(dataDir, filename);
  const content = await fs.promises.readFile(fp, "utf8");
  return JSON.parse(content) as T;
}

export function readJsonFileSync<T = any>(filename: string): T {
  const fp = path.join(dataDir, filename);
  const content = fs.readFileSync(fp, "utf8");
  return JSON.parse(content) as T;
}
