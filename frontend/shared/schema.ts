import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const incidents = pgTable("incidents", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  date: timestamp("date").notNull(),
  location: text("location").notNull(),
  state: text("state").notNull(),
  mineType: text("mine_type").notNull(),
  incidentType: text("incident_type").notNull(),
  severity: text("severity").notNull(),
  fatalities: integer("fatalities").notNull().default(0),
  injuries: integer("injuries").notNull().default(0),
  description: text("description").notNull(),
  rootCause: text("root_cause"),
  recommendations: text("recommendations"),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertIncidentSchema = createInsertSchema(incidents).omit({
  id: true,
  createdAt: true,
});

export type InsertIncident = z.infer<typeof insertIncidentSchema>;
export type Incident = typeof incidents.$inferSelect;

export const scrapedData = pgTable("scraped_data", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  source: text("source").notNull(),
  url: text("url"),
  content: text("content").notNull(),
  scrapedAt: timestamp("scraped_at").notNull().defaultNow(),
  processed: integer("processed").notNull().default(0),
  metadata: jsonb("metadata"),
});

export const insertScrapedDataSchema = createInsertSchema(scrapedData).omit({
  id: true,
  scrapedAt: true,
});

export type InsertScrapedData = z.infer<typeof insertScrapedDataSchema>;
export type ScrapedData = typeof scrapedData.$inferSelect;

export const chatMessages = pgTable("chat_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  role: text("role").notNull(),
  content: text("content").notNull(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
  metadata: jsonb("metadata"),
});

export const insertChatMessageSchema = createInsertSchema(chatMessages).omit({
  id: true,
  timestamp: true,
});

export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;
export type ChatMessage = typeof chatMessages.$inferSelect;
