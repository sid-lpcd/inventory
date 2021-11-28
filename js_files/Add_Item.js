const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();


export async function AddItem(userData) {
  console.log(`Start seeding ...`);
  for (const u of userData) {
    const user = await prisma.item.create({
      data: u
    });
    console.log(`Created user with id: ${user.id}`);
  }
  console.log(`Seeding finished.`);
}

