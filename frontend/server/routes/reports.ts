import { Router } from "express";
import { readJsonFile } from "../lib/data";

export function reportsRouter(): Router {
  const r = Router();

  r.get("/", async (_req, res, next) => {
    try {
      const data = await readJsonFile("reports.json");
      res.json(data);
    } catch (e) {
      next(e);
    }
  });

  return r;
}
