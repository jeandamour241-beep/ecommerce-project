import {PrismaPg} from '@prisma/adapter-pg';
import {PrismaClient} from '../generated/prisma/client.ts';
import 'dotenv/config';

let connectionString = `${process.env.DATABASE_URL}`;
let adapter = new PrismaPg({connectionString});
let prisma = new PrismaClient({adapter});

let connectDB = async () => {
    try {
        await prisma.$connect();
        console.log('database connected successfully');
    } catch (error) {
        console.log(error.message);
    }
}

export {prisma, connectDB};