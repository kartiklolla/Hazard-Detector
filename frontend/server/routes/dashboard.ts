import { Router } from "express";
import { readJsonFile } from "../lib/data";

export function dashboardRouter(): Router {
  const r = Router();

  r.get("/", async (_req, res, next) => {
    try {
      const data = await readJsonFile("dashboard.json");
      res.json(data);
    } catch (e) {
      next(e);
    }
  });

  return r;
}
