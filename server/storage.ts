import { 
  type IntakeSubmission, 
  type InsertIntakeSubmission,
  type Order,
  type InsertOrder,
  intakeSubmissions,
  orders
} from "@shared/schema";
import { db } from "./db";
import { desc } from "drizzle-orm";

export interface IStorage {
  createIntakeSubmission(submission: InsertIntakeSubmission): Promise<IntakeSubmission>;
  createOrder(order: InsertOrder): Promise<Order>;
  getAllIntakeSubmissions(): Promise<IntakeSubmission[]>;
  getAllOrders(): Promise<Order[]>;
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

  async getAllIntakeSubmissions(): Promise<IntakeSubmission[]> {
    const submissions = await db.select().from(intakeSubmissions).orderBy(desc(intakeSubmissions.createdAt));
    return submissions;
  }

  async getAllOrders(): Promise<Order[]> {
    const allOrders = await db.select().from(orders).orderBy(desc(orders.createdAt));
    return allOrders;
  }
}

export const storage = new DbStorage();
