const { Router } = require("express");
const {
    getAllForumsTopicsHandler,
    getOneForumTopicHandler,
    createForumTopicHandler,
    updateForumTopicHandler,
    deleteForumTopicHandler
} = require("../handlers/forumHandler");
const forumRouter = Router();

forumRouter.get("/", getAllForumsTopicsHandler);
forumRouter.get("/:id", getOneForumTopicHandler);
forumRouter.post("/", createForumTopicHandler);
forumRouter.put("/:id", updateForumTopicHandler);
forumRouter.delete("/:id", deleteForumTopicHandler);

module.exports = forumRouter;