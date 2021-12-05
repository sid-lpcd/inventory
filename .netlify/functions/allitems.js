import { PrismaClient} from "@prisma/client";
const prisma = new PrismaClient();

exports.handler = async (req, res) => {
    const todos = await prisma.item.findMany();
    res.json(todos);
  }
