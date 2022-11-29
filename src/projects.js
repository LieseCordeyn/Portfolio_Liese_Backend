const {
    MongoClient,
    ObjectId
} = require('mongodb');
require('dotenv').config();

const client = new MongoClient(process.env.FINAL_URL);

/**
 * [GET] - shows all projects
 *
 * @Param []
 * @Returns all projects 
 */
exports.allProjects = async function(req, res){
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
    }

/**
 * [GET] - shows uitgelichte projects
 *
 * @Param []
 * @Returns uitgelichte projects 
 */
exports.UitgelichteProject = async function(req, res){
        try {
            await client.connect();

            const coll = client.db(process.env.DB_NAME).collection(process.env.DB_COLLECTION)
            const data = await coll.find({Categories: "Uitgelicht"}).toArray();

            res.status(200).send(data)
        } catch (err) {
            res.status(500).send({
                error: "Something went wrong",
                value: err
            })
        } finally {
            await client.close();
        }
    }