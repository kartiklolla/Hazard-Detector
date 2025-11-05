import { Router } from "express";
import { readJsonFile } from "../lib/data";

export function incidentsRouter(): Router {
  const r = Router();

  // GET / -> list incidents
  r.get("/", async (_req, res, next) => {
    try {
      const data = await readJsonFile("incidents.json");
      res.json(data);
    } catch (e) {
      next(e);
    }
  });

  return r;
}
