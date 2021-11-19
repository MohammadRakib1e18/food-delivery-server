const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const cors = require('cors');

const app = express();
const port= process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.np0as.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run(){
    try{
        await client.connect();
        const database = client.db('onineShop');
        const serviceCollection = database.collection('services');

        //GET Api
        app.get('/services', async(req, res)=>{
            const cursor = serviceCollection.find({});
            const services = await cursor.toArray();
            // console.log(services);
            res.json(services);
        })
        // // POST Api
        // app.post('/services', async(req, res)=>{
        //     const service = req.body;
        //     const result = await serviceCollection.insertOne(service);
        //     console.log(result);
        //     res.json(result);
        // })

    }
    finally{
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res)=>{
    res.send('Server is running');
})

app.listen(port, ()=>{
    console.log('Server is running at port', port);
})