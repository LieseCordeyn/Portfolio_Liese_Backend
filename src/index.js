const express = require('express');
require('dotenv').config();
const cors = require("cors");
const bodyParser = require('body-parser');
require('express-group-routes');

const app = express()
const port = process.env.PORT;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());

const projectRoutes = require('./projects')

app.get('/', (req, res) => {
    res.status(300).redirect('/index.html');
})

app.group("/api", (router) => {

    router.get('/', (req, res) => {
        res.status(300).redirect('/index.html');
    })

    router.get("/projects", projectRoutes.allProjects )
    router.get("/projects/uitgelicht", projectRoutes.UitgelichteProject)
    router.get("/projects/finalWorks", projectRoutes.FinalWorkProject)
    router.get("/projects/expertLab", projectRoutes.ExpertLabProject)
    router.post("/projects", projectRoutes.addProject)
})

app.listen(port)