"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comments = void 0;
const Comment_1 = require("../entity/Comment");
const typeorm_1 = require("typeorm");
class Comments {
}
exports.Comments = Comments;
Comments.addComments = async (req, res) => {
    const { comment, noteId, user } = req.body;
    const CommentsRepo = typeorm_1.getRepository(Comment_1.Comment);
    const newComment = new Comment_1.Comment();
    newComment.description = comment;
    newComment.note = noteId;
    newComment.user = user;
    const savedComment = await CommentsRepo.save(newComment);
    if (savedComment) {
        res.json(savedComment);
    }
    else {
        res.sendStatus(400);
    }
};
Comments.deleteComment = async (req, res) => {
    const { comment, user } = req.body;
    if (comment.user.id !== user.id) {
        return res.status(400).send("not authorized");
    }
    const CommentsRepo = typeorm_1.getRepository(Comment_1.Comment);
    await CommentsRepo.remove(comment);
    return res.sendStatus(201);
};
Comments.updateComment = async (req, res) => {
    const { comment, update, user } = req.body;
    if (comment.user.id !== user.id) {
        return res.status(400).send("not authorized");
    }
    const CommentsRepo = typeorm_1.getRepository(Comment_1.Comment);
    comment.description = update;
    const updatedComment = await CommentsRepo.save(comment);
    return res.json(updatedComment);
};
//# sourceMappingURL=comments.js.map