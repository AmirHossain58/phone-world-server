const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const {
  MongoClient,
  ServerApiVersion,
  ObjectId
} = require('mongodb')

const port = process.env.PORT || 8000

// middleware 
const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true,
  optionSuccessStatus: 200,
}
app.use(cors(corsOptions))

app.use(express.json())
// connect with mongodb
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4j3msur.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

async function run() {
  try {
    // create mongodb collection
    const phonesCollection = client.db('PhoneWorldDB').collection('phones')

 // Get all phones data from db
 app.get('/all-phones', async (req, res) => {
  // Pagination
  const size = parseInt(req.query.size)
  const page = parseInt(req.query.page) - 1
  // filter by category
  const filter = req.query.filter
  const filterByBand = req.query.filterByBand
  console.log(filterByBand);
  
  const sort = req.query.sort
  const search = req.query.search
  const {minPrice, maxPrice}=req.query
  // console.log(size, page)

  let query = {
    productName: { $regex: search, $options: 'i' },
  }
  if (minPrice !== undefined && maxPrice !== undefined) {
    query.price = { $gte: parseFloat(minPrice), $lte: parseFloat(maxPrice) }; 
  }
  if (filter) query.category=filter 
  if (filterByBand) query.brand=filterByBand 
  let options = {}
  if (sort) {
    if(sort==='Newest first'){
      options = { sort: { createdAt: -1 } }
    }else{
      options = { sort: { price: sort === 'asc' ? 1 : -1 } }
    }
  }
  const result = await phonesCollection
    .find(query, options)
    .skip(page * size)
    .limit(size)
    .toArray()

  res.send(result)
})
 // Get all phones data count from db
 app.get('/phones-count', async (req, res) => {
  const filter = req.query.filter
  const search = req.query.search
  const {minPrice, maxPrice}=req.query
  let query = {
    productName: { $regex: search, $options: 'i' },
  }
  if (filter) query.category = filter
  if (minPrice !== undefined && maxPrice !== undefined) {
    query.price = { $gte: parseFloat(minPrice), $lte: parseFloat(maxPrice) }; 
  }
  const count = await phonesCollection.countDocuments(query)

  res.send({ count })
})




      
    // Send a ping to confirm a successful connection
    await client.db('admin').command({
      ping: 1
    })
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    )
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir)

app.get('/', (req, res) => {
  res.send('Hello from Phone World Server..')
})

app.listen(port, () => {
  console.log(`Phone World is running on port ${port}`)
})