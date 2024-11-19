const { Router } = require("express");
const postsRouter = Router();

postsRouter.get("/", (req, res) => {
    res.send("Estos son los posteos");
});
postsRouter.get("/:id", (req, res) => {
    res.send("Estos son los posteos");
});
postsRouter.post("/", (req, res) => {
    res.send("Estos son los posteos");
});
postsRouter.put("/:id", (req, res) => {
    res.send("Estos son los posteos");
});
postsRouter.delete("/:id", (req, res) => {
    res.send("Elimino un posteo");
});

module.exports = postsRouter;