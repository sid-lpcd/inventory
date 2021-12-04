import express from "express";
import { PrismaClient} from "@prisma/client";
import {PythonShell} from 'python-shell';
const app = express();
const prisma = new PrismaClient();
app.use(express.json());

const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer')
 
// enable CORS
app.use(cors());
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
// serving static files
app.use('/uploads', express.static('uploads'));
 
// handle storage using multer
var storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, './python_files/images/');
   },
   filename: function (req, file, cb) {
      cb(null, Date.now() +'_' + file.originalname);
   }
});
var upload = multer({ storage: storage });

// handle single file upload
app.post('/upload-file', upload.single('File'), (req, res, next) => {
   const file = req.file;
   if (!file) {
      return res.status(400).send({ message: 'Please upload a file.' });
   }
   res.json(req.file.path)
});


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
      },
    })

    for (let index = 0; index < hazard.length; index++) {
      const itemsId = []
      const item = await prisma.item.findFirst({
        where: { name:{
          contains: name
          } 
        },
        take: -1
      })
      itemsId.push(item.id)
    
      let findHazard = await prisma.hazard.findUnique({ where: { hazardName: hazard[index],} })
      let result = []
      if(findHazard === null){
        result = await prisma.hazard.create({
          data: {
            hazardName: hazard[index],
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
    }
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
    const { id } = req.query.searchString
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
  app.get("/imageUpload", async (req, res) => {
    let options = {
        mode: 'text',
        pythonOptions: ['-u'],
        scriptPath: 'C:/Users/sidon/Documents/Metalchemy_Vice_President_Engineering/Inventory_App/inventory/python_files/',
        args: [req.query.path, req.query.val]
    };
    PythonShell.run('data_finder.py', options, function (err, results) {
        if (err) throw err;
        // results is an array consisting of messages collected during execution
        res.json(results);
    });
})

export default {
    path: "/api",
    handler: app
};