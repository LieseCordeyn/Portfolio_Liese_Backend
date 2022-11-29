const express = require('express');
require('dotenv').config();
const {
    MongoClient
} = require('mongodb');
require('express-group-routes');

const app = express()
const port = process.env.PORT;

const client = new MongoClient(process.env.FINAL_URL);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.group("/api", (router) => {
    router.get("/projects", async (req, res) => {
        try {
            await client.connect();

            const coll = client.db(process.env.DB_NAME).collection(process.env.DB_COLLECTION)
            const data = await coll.find({}).toArray();

            res.status(200).send(data)
        } catch (err) {
            res.status(500).send({
                error: "Something went wrong",
                value: err
            })
        } finally {
            await client.close();
        }
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})