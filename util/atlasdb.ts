import { MongoClient } from "mongodb"
import { customAlphabet } from 'nanoid';
const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const nanoid = customAlphabet(alphabet, 8);

// Connection URI
const uri = process.env.MONGODB_URI
const db = process.env.MONGODB_DB

if (!uri) {
    throw new Error("MONGODB_URI undefined")
}

if (!db) {
    throw new Error("MONGODB_DB undefined")
}

const client = new MongoClient(uri);

const ping = async () => {
    try {
        // Connect the client to the server
        await client.connect()
        // Establish and verify connection
        await client.db(db).command({ ping: 1 })
        console.log("Connected successfully to server")
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

const createDoc = async (url: string) => {
    let res = null
    const doc = {
        url: url,
        short: nanoid()
    }
    try {
        // Connect the client to the server
        await client.connect()
        const collection = client.db(db).collection('urls')
        res = await collection.insertOne(doc)
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
    return doc.short
}

const getUrl = async (short: string) => {
    let urlRes = null
    const query = {
        short: short
    }
    try {
        // Connect the client to the server
        await client.connect()
        const collection = client.db(db).collection('urls')
        const options = {
            // Include only the `title` and `imdb` fields in the returned document
            projection: { _id: 0, url: 1, short: 1 },
        };

        urlRes = await collection.findOne(query, options);
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
    return urlRes!.url
}


export { ping, createDoc, getUrl }