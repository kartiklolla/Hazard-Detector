import { Router } from "express";
import { readJsonFile } from "../lib/data";

export function analyticsRouter(): Router {
  const r = Router();

  r.get("/", async (req, res, next) => {
    try {
      const data = await readJsonFile("analytics.json");
      res.json(data);
    } catch (e) {
      next(e);
    }
  });

  return r;
}
