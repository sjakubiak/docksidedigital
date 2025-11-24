import { 
  type IntakeSubmission, 
  type InsertIntakeSubmission,
  type Order,
  type InsertOrder,
  intakeSubmissions,
  orders
} from "@shared/schema";
import { db } from "./db";

export interface IStorage {
  createIntakeSubmission(submission: InsertIntakeSubmission): Promise<IntakeSubmission>;
  createOrder(order: InsertOrder): Promise<Order>;
}

export class DbStorage implements IStorage {
  async createIntakeSubmission(submission: InsertIntakeSubmission): Promise<IntakeSubmission> {
    const [created] = await db.insert(intakeSubmissions).values(submission).returning();
    return created;
  }

  async createOrder(order: InsertOrder): Promise<Order> {
    const [created] = await db.insert(orders).values(order).returning();
    return created;
  }
}

export const storage = new DbStorage();
