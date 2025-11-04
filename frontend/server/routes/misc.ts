import { Router } from "express";
import { readJsonFile } from "../lib/data";

export function miscRouter(): Router {
  const r = Router();

  r.get("/suggested-queries", async (_req, res, next) => {
    try {
      const data = await readJsonFile<string[]>("suggested_queries.json");
      res.json(data);
    } catch (e) {
      next(e);
    }
  });

  r.get("/capabilities", async (_req, res, next) => {
    try {
      const data = await readJsonFile("capabilities.json");
      res.json(data);
    } catch (e) {
      next(e);
    }
  });

  return r;
}
