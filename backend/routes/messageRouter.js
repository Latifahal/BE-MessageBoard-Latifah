import express from 'express'

const data = []
const messageRouter  = express.Router()

messageRouter
    //for more specific routing we can add the "/smth", before the req // res.json or res.send are fine.
    .get("/", (req, res) => res.json(data)) 
    .post("/", (req, res) => {
        //Assumption: request contains a body w/ a msg object
        req.body.id = Date.now() // Date.now() gives us a date with m-seconds
        data.push(req.body)
        res.status(201)
        res.send( {sucess: true, message: req.body}) //we should always send something back 

    })

    .put("/:id",(req, res) => res.status(501).send({error: "Not implemented"}))
    .patch("/:id",(req, res) => res.sendStatus(501).send({error: "Not implemented"}))
    .delete("/:id",(req, res) => res.sendStatus(501).send({error: "Not implemented"}))

export default messageRouter
