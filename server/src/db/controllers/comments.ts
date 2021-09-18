import { Comment } from "../entity/Comment";
import { getRepository } from "typeorm";
import { Request, Response } from "express";

export class Comments {
  static addComments = async (req: Request, res: Response) => {
    const { comment, noteId, user } = req.body;
    const CommentsRepo = getRepository(Comment);
    const newComment = new Comment();
    newComment.description = comment;
    newComment.note = noteId;
    newComment.user = user;

    const savedComment = await CommentsRepo.save(newComment);
    if (savedComment) {
      res.json(savedComment);
    } else {
      res.sendStatus(400);
    }
  };

  static deleteComment = async (req: Request, res: Response) => {
    const { comment } = req.body;
    const CommentsRepo = getRepository(Comment);
    await CommentsRepo.remove(comment);
    res.sendStatus(201);
  };

  static updateComment = async (req: Request, res: Response) => {
    const { comment, update } = req.body;
    const CommentsRepo = getRepository(Comment);
    comment.description = update;
    const updatedComment = await CommentsRepo.save(comment);
    res.json(updatedComment);
  };
}
