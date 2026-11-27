const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('../generated/client');

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error('Configure DATABASE_URL para iniciar o servidor.');
}

const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString }),
});

module.exports = { prisma };
