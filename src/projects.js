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

/**
 * [GET] - shows expert lab projects
 *
 * @Param []
 * @Returns expert lab projects 
 */
exports.ExpertLabProject = async function(req, res){
    try {
        await client.connect();

        const coll = client.db(process.env.DB_NAME).collection(process.env.DB_COLLECTION)
        const data = await coll.find({Categories: "Expert Lab"}).toArray();

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
 * [GET] - shows final works projects
 *
 * @Param []
 * @Returns final works projects 
 */
exports.FinalWorkProject = async function(req, res){
    try {
        await client.connect();
        
        const coll = client.db(process.env.DB_NAME).collection(process.env.DB_COLLECTION)
        const data = await coll.find({Categories: "Final Works"}).toArray();
        
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
 * [POST] - Add project to database
 *
 * @Returns Created project 
 */
exports.addProject = async function (req, res){
    try {
        await client.connect();

        const coll = client.db(process.env.DB_NAME).collection(process.env.DB_COLLECTION)

        let newProject = {
            Title: req.body.Title,
            Categories: req.body.Categories,
            Description: req.body.Description,
            GithubLink: req.body.GithubLink,
            ImageUrls: req.body.ImageUrls,
            Tags: req.body.Tags
        }

        let insertResult = await coll.insertOne(newProject);
        res.status(201).send('project created');
        return

    }catch (err) {
        res.status(500).send({
            error: 'an error has occured',
            value: err
        });
    }finally {
        await client.close()
    }
}