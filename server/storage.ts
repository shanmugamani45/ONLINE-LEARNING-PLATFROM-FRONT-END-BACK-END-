import { db } from "./db";
import {
  courses, instructors, enrollments, contactMessages,
  type Course, type InsertCourse,
  type Instructor, type InsertInstructor,
  type Enrollment, type InsertEnrollment,
  type ContactMessage, type InsertContactMessage
} from "@shared/schema";
import { eq, ilike, or } from "drizzle-orm";

export interface IStorage {
  // Courses
  getCourses(search?: string, category?: string): Promise<Course[]>;
  getCourse(id: number): Promise<Course | undefined>;
  createCourse(course: InsertCourse): Promise<Course>;
  
  // Instructors
  getInstructors(): Promise<Instructor[]>;
  getInstructor(id: number): Promise<Instructor | undefined>;
  createInstructor(instructor: InsertInstructor): Promise<Instructor>;
  
  // Enrollments
  createEnrollment(enrollment: InsertEnrollment): Promise<Enrollment>;
  
  // Contact
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
}

export class DatabaseStorage implements IStorage {
  async getCourses(search?: string, category?: string): Promise<Course[]> {
    let query = db.select().from(courses);
    
    if (search) {
      query = query.where(or(
        ilike(courses.title, `%${search}%`),
        ilike(courses.description, `%${search}%`)
      )) as any;
    }
    
    if (category) {
      // If we already have a where clause from search, we need to add to it using 'and' logic (which is default for chaining .where)
      // However, Drizzle's query builder is a bit specific. 
      // For simplicity in this demo, let's just use JS filtering if combined, or simple where if single.
      // But actually, chaining .where() usually acts as AND in many query builders. 
      // Let's verify Drizzle behavior: yes, subsequent .where() calls are ANDed.
      // But `ilike` returns a SQL chunk, so we need to be careful.
      // Let's reload to be safe:
      const allCourses = await db.select().from(courses);
      return allCourses.filter(course => {
        const matchesSearch = search ? (course.title.toLowerCase().includes(search.toLowerCase()) || course.description.toLowerCase().includes(search.toLowerCase())) : true;
        const matchesCategory = category ? course.category === category : true;
        return matchesSearch && matchesCategory;
      });
    }

    if (search) {
        return await db.select().from(courses).where(or(
            ilike(courses.title, `%${search}%`),
            ilike(courses.description, `%${search}%`)
        ));
    }
    
    return await db.select().from(courses);
  }

  async getCourse(id: number): Promise<Course | undefined> {
    const [course] = await db.select().from(courses).where(eq(courses.id, id));
    return course;
  }

  async createCourse(insertCourse: InsertCourse): Promise<Course> {
    const [course] = await db.insert(courses).values(insertCourse).returning();
    return course;
  }

  async getInstructors(): Promise<Instructor[]> {
    return await db.select().from(instructors);
  }

  async getInstructor(id: number): Promise<Instructor | undefined> {
    const [instructor] = await db.select().from(instructors).where(eq(instructors.id, id));
    return instructor;
  }

  async createInstructor(insertInstructor: InsertInstructor): Promise<Instructor> {
    const [instructor] = await db.insert(instructors).values(insertInstructor).returning();
    return instructor;
  }

  async createEnrollment(insertEnrollment: InsertEnrollment): Promise<Enrollment> {
    const [enrollment] = await db.insert(enrollments).values(insertEnrollment).returning();
    return enrollment;
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const [message] = await db.insert(contactMessages).values(insertMessage).returning();
    return message;
  }
}

export const storage = new DatabaseStorage();
