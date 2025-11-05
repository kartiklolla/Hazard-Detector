import type { Express } from "express";
import express from "express";
import { createServer, type Server } from "http";
import { analyticsRouter } from "./routes/analytics";
import { dashboardRouter } from "./routes/dashboard";
import { scraperRouter } from "./routes/scraper";
import { reportsRouter } from "./routes/reports";
import { incidentsRouter } from "./routes/incidents";
import { miscRouter } from "./routes/misc";
import { chatRouter } from "./routes/chat";

export async function registerRoutes(app: Express): Promise<Server> {
  // mount small routers under /api
  const router = express.Router();

  router.use("/analytics", analyticsRouter());
  router.use("/dashboard", dashboardRouter());
  router.use("/scraper", scraperRouter());
  router.use("/reports", reportsRouter());
  router.use("/incidents", incidentsRouter());
  router.use("", miscRouter());
  router.use("/chat", chatRouter());

  app.use("/api", router);

  const httpServer = createServer(app);
  return httpServer;
}
