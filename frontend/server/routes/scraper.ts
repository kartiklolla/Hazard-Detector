import { Router } from "express";
import { readJsonFile } from "../lib/data";

export function scraperRouter(): Router {
  const r = Router();

  r.get("/", async (_req, res, next) => {
    try {
      const data = await readJsonFile("scraper.json");
      res.json(data);
    } catch (e) {
      next(e);
    }
  });

  return r;
}
