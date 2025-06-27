import { db } from "../lib/db";

// Function to fetch user by email
export const getUserByEmail = async (email) => {
  try {
    const user = await db.user.findUnique({
      where: { email: email.toLowerCase() }, 
    });
    return user;
  } catch (error) {
    return null;
  }
};