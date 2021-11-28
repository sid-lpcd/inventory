const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function getItems() {
    const user = await prisma.item.findMany();
    return user
}
export async function ViewItem() {
  console.log(`Start looking ...`);
    const result = await getItems()
    console.log(`Looking finished.`);
    return result
}

