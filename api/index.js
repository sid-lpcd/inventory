import express from "express";
import { PrismaClient} from "@prisma/client";
const app = express();
const prisma = new PrismaClient();
app.use(express.json());


//create hazard
app.post(`/hazard`, async (req, res) => {
  const itemsId = []
  if (req.body.type === 'last') {
    const item = await prisma.item.findFirst({
      where: { name:{
        contains: req.body.name
        } 
      },
      take: -1
    })
    itemsId.push(item.id)
  }
  else{
    const items = await prisma.item.findMany({
      where: { name:{
        contains: req.body.name
        } 
      }
    })
    
    items.forEach(item => itemsId.push(item.id))
  }
  let findHazard = await prisma.hazard.findUnique({ where: { hazardName: req.body.hazard,} })
  let result = []
  if(findHazard === null){
    result = await prisma.hazard.create({
      data: {
        hazardName: req.body.hazard,
      },
    })
    findHazard = result
  }
  result = []
  for (let i = 0; i < itemsId.length; i++) {
    result.push(await prisma.item.update({
      where:{
        id: itemsId[i]
      }, 
      data:{
        hazards:{
          connect:{
                id: findHazard.id
          }
        }
      }
    })
    )
 
  }
  res.json(result)
  })
//create item
app.post('/item', async (req, res) => {
    const { name, quantity, measure, unit, hazard } = req.body
    const post = await prisma.item.create({
      data: {
          name,
          quantity,
          measure,
          unit,
          hazards:{
            connectOrCreate:{
              where:{
                hazardName: hazard
              },
              create:{
                hazardName: hazard
              }
            }
          }
      },
    })
    res.status(200).json(post)
  })

//Get all items
app.get("/allitems", async (req, res) => {
    const todos = await prisma.item.findMany();
    res.json(todos);
  })

  //Get all hazards
app.get("/allhazards", async (req, res) => {
  const todos = await prisma.hazard.findMany();
  res.json(todos);
})


  //Delete Item
  app.delete(`/DeleteItemById`, async (req, res) => {
    const { id } = req.query
    const post = await prisma.item.delete({
      where: {
        id: parseInt(id),
      },
    })
    res.json(post)
  })
  //Search for Item
  app.get('/ItemByName', async (req, res) => {
    const draftPosts = await prisma.item.findMany({
      where: {
        OR: [
          {
            name: {
              contains: req.query.searchString,
            },
          },
        ],
      },
    })
    res.send(draftPosts)
  })
  //get Item by id
  app.get('/ItemById', async (req, res) => {
    const post = await prisma.item.findUnique({
      where: {
        id: Number(req.query.searchString),
      },
    })
    res.json(post)
  })
  //Search for Item
  app.get('/ItemByDate', async (req, res) => {

    const draftPosts = await prisma.item.findMany({
      where: {
        createdAt: {
          gte: req.query.start,
          lt: req.query.end
        },
        
      },
    })
    res.send(draftPosts)
  })
  //Search for Item
  app.get('/ItemByHazard', async (req, res) => {
    const draftPosts = await prisma.item.findMany({
      where: {
        hazards:{
          some:{
            hazardName:{
              in: req.query.searchString,
            }
          }
        },
      },
    })
    res.send(draftPosts)
  })

  //Get Hazards in Item
  app.get('/HazardsInItem', async (req, res) => {
    const draftPosts = await prisma.hazard.findMany({
      where: {
        name:{
          some:{
            id: Number(req.query.searchString)
          }
        }
        
      },
    })
    res.send(draftPosts)
  })

export default {
    path: "/api",
    handler: app
};