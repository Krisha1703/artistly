// Handles user login functionality

"use server";

import { LoginSchema } from "../schemas/login-schema";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "../utils/user";

// Retrieve test user credentials from environment variables
const TEST_USER_EMAIL = process.env.TEST_USER_EMAIL || "artistly@manager.com";
const TEST_USER_PASSWORD = process.env.TEST_USER_PASSWORD || "test123";

export const login = async (data) => {
  try {

    const validatedFields = await LoginSchema.validate(data, {
      abortEarly: false, // show all errors
    });

    const { email, password } = validatedFields;

    // Handle test login
    if (email === TEST_USER_EMAIL && password === TEST_USER_PASSWORD) {
      return {
        success: "Test Manager Log in successfully!",
        firstName: "Test",
        lastName: "Manager",
        email: TEST_USER_EMAIL,
        role: "manager",
        createdAt: new Date().toISOString(),
      };
    }

    // Check if user exists
    const existingUser = await getUserByEmail(email);
    if (!existingUser) {
      return { error: "Email not found. Please register first." };
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return { error: "Incorrect password. Please try again." };
    }

    console.log("User logged in:", existingUser.email);

    // Return user data
    return {
      success: "User Log in successfully!",
      firstName: existingUser.firstName,
      lastName: existingUser.lastName,
      email: existingUser.email,
      role: existingUser.role,
      createdAt: existingUser.createdAt,
    };
  } catch (error) {
    if (error.name === "ValidationError") {
      return { error: error.errors.join(" ") };
    }
    console.error("Login error:", error);
    return { error: "Something went wrong during login." };
  }
};
