function checkPass(req, res, nex) {

    const password = req.get("Authorization")

    if (password !== "088") {
        res.status(401)
        res.send({error: "Invalid password"})
        return
    }

    next()

}

export default checkPass