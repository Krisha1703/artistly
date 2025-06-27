// Handles user registration logic

"use server";

import { RegisterSchema } from "../schemas/resgister-schema"; 
import bcrypt from "bcryptjs";
import { db } from "../lib/db";
import { getUserByEmail } from "../utils/user";

// Determine role from email
const getRoleFromEmail = (email) =>
  email.includes("@manager") ? "manager" : "event_planner";

export const register = async (data) => {
  try {

    const validatedUser = await RegisterSchema.validate(data, {
      abortEarly: false, 
    });

    const { firstName, lastName, email, password } = validatedUser;

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return { error: "Email already in use." };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const role = getRoleFromEmail(email);

    const newUser = await db.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role,
        lastLoginAt: new Date(),
        createdAt: new Date(),
      },
    });

    return {
      success: "Account created successfully!",
      data: {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
      },
    };
  } catch (error) {
    if (error.name === "ValidationError") {
      const formatted = error.errors.join(" ");
      return { error: formatted };
    }
    console.error("Registration error:", error);
    return { error: "Something went wrong during registration." };
  }
};
