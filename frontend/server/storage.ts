import { type User, type InsertUser, type ChatMessage, type InsertChatMessage } from "@shared/schema";
import { randomUUID } from "crypto";
import fs from "fs";
import path from "path";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  // chat-related
  getChatMessages(): Promise<ChatMessage[]>;
  insertChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private chatMessages: ChatMessage[];
  private chatFilePath: string;

  constructor() {
    this.users = new Map();
    this.chatMessages = [];
    this.chatFilePath = path.resolve(import.meta.dirname, "data", "chat.json");

    // load existing chat messages from disk if present
    try {
      if (fs.existsSync(this.chatFilePath)) {
        const raw = fs.readFileSync(this.chatFilePath, "utf8");
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          // normalize timestamps
          this.chatMessages = parsed.map((m: any) => ({ ...m, timestamp: m.timestamp ? new Date(m.timestamp) : new Date() }));
        }
      }
    } catch (e) {
      // ignore load errors and start with empty array
      this.chatMessages = [];
    }
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getChatMessages(): Promise<ChatMessage[]> {
    // return a shallow copy to avoid external mutation
    return [...this.chatMessages];
  }

  async insertChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const id = randomUUID();
    const msg: ChatMessage = {
      id,
      role: insertMessage.role,
      content: insertMessage.content,
      timestamp: new Date(),
      metadata: insertMessage.metadata ?? null,
    } as ChatMessage;

    this.chatMessages.push(msg);
    // persist chat messages to disk (best-effort)
    try {
      const dir = path.dirname(this.chatFilePath);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(this.chatFilePath, JSON.stringify(this.chatMessages, null, 2), "utf8");
    } catch (e) {
      // log but don't throw
      // console.error("Failed to persist chat messages", e);
    }

    return msg;
  }
}

export const storage = new MemStorage();
