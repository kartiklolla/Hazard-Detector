import { Router } from "express";
import { storage } from "../storage";

export function chatRouter(): Router {
  const r = Router();

  r.get("/", async (_req, res, next) => {
    try {
      const messages = await storage.getChatMessages();
      res.json(messages);
    } catch (e) {
      next(e);
    }
  });

  r.post("/", async (req, res, next) => {
    try {
      const { role, content } = req.body ?? {};
      if (!role || !content) return res.status(400).json({ message: "role and content required" });

      const userMsg = await storage.insertChatMessage({ role, content });

      let assistantMsg = null;
      if (role === "user") {
        const reply = `I've registered your query: "${String(content).slice(0, 200)}". (Prototype reply)`;
        assistantMsg = await storage.insertChatMessage({ role: "assistant", content: reply });
      }

      res.status(201).json({ user: userMsg, assistant: assistantMsg });
    } catch (e) {
      next(e);
    }
  });

  return r;
}
