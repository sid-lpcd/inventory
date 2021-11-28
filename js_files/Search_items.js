const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getItemByName(look) {
    const user = await prisma.item.findMany({
        where:{
            name: {
                contains: look
            }
        }
    }
    );
    console.log(user)
}
async function getItemById(look){
    const result=  await prisma.item.findUnique({
                    where: {
                        id: parseInt(look)
                    },
                })
    console.log(result)
}

async function getItemByDate(look){
    const result=  await prisma.item.findMany({
                where: {
                    createdAt:{
                        contains: look
                    }

                },
            })
    console.log(result)
}

async function getItemByHazard(look){
    const result=  await prisma.hazard.findMany({
                where: {
                    hazard_name:{
                        contains: look
                    }

                },
            })
    console.log(result)
}
export function square(x) {
    return x * x;
}
export function Select(sel, lookFor) {
  console.log(`Start looking ...`);
  console.log(sel)
  console.log(lookFor)
  switch (sel) {
        case 'Name':
            getItemByName(lookFor)
            break;

        case 'Id':
            getItemById(lookFor)
            break;

        case 'Date of Entry':
            getItemByDate(lookFor)
            break;
        
        case 'Hazards':
            getItemByHazard(lookFor)
            break;

    }

  console.log(`Looking finished.`);
}


