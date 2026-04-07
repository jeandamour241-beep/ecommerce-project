import { PrismaPg } from '@prisma/adapter-pg';
import pkg from '@prisma/client';
import 'dotenv/config';

const { PrismaClient } = pkg;

const connectionString = process.env.DATABASE_URL;

const adapter = new PrismaPg({ connectionString });

const prisma = new PrismaClient({
  adapter,
});

const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log('database connected successfully');
  } catch (error) {
    console.log(error.message);
  }
};

export { prisma, connectDB };