// This file is part of the "lib" directory, which contains utility functions for database interactions and other shared logic.

import { PrismaClient } from "@prisma/client";

export const db = globalThis.prisma || new PrismaClient();

if(process.env.NODE_ENV != "production") globalThis.prisma = db;

