import express from "express";
import { PrismaClient} from "@prisma/client";
const app = express();
const prisma = new PrismaClient();
app.use(express.json());


//create hazard
app.post(`/hazard`, async (req, res) => {
    if(await prisma.hazard.findUnique({
        where: {
            hazardName: req.body.hazard,
          },

      })=== null){
        const result = await prisma.hazard.create({
            data: {
              hazardName: req.body.hazard,
            },
          })
          res.json(result)
      }
  })
//create item
app.post('/item', async (req, res) => {
    const { name, quantity, volume, unit, hazard } = req.body
    const post = await prisma.item.create({
      data: {
          name,
          quantity,
          volume,
          unit,
          hazards:{
            connectOrCreate:{
              hazardName: hazard
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
export default {
    path: "/api",
    handler: app
};