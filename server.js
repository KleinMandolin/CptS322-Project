
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const app = express();
const port = process.env.PORT || 3001;

const uri = process.env.MONGODB_URI; 
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(express.json());

app.post('/data', async (req, res) => {
    try {
        await client.connect();
        const database = client.db('howdy'); 
        const collection = database.collection('howdy'); 

        const doc = req.body;
        const result = await collection.insertOne(doc);
        res.send(`New document inserted with the following id: ${result.insertedId}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error connecting to the database');
    } finally {
        await client.close();
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
