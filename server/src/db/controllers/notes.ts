import { Note } from "../entity/Note";
import { getRepository } from "typeorm";
import { validate, ValidationError } from "class-validator";
import { Request, Response } from "express";
import { getValidationErrors } from "./errors";
import { Comment } from "../entity/Comment";

// const notesRepo = getRepository(Note);

export class Notes {
  static addNote = async (req: Request, res: Response) => {
    const { title, description, categoryId, id, language } = req.body;
    const notesRepo = getRepository(Note);

    const note = new Note();
    note.category = categoryId;
    note.user = id;
    note.title = title;
    note.description = description;
    note.language = language;

    const potentialErrors: ValidationError[] = await validate(note);
    if (potentialErrors.length > 0) {
      return res.status(404).send(getValidationErrors(potentialErrors));
    }

    await notesRepo.save(note);
    return res.status(201).json(note);
  };

  static deleteNote = async (req: Request, res: Response) => {
    const { note } = req.body;
    const notesRepo = getRepository(Note);

    await notesRepo.remove(note);
    res.sendStatus(201);
  };

  static updateNote = async (req: Request, res: Response) => {
    const { note, title, descriptions } = req.body;
    const notesRepo = getRepository(Note);

    note.title = title;
    note.description = descriptions;

    await notesRepo.save(note);
    return res.status(200).json(note);
  };

  static getNote = async (id: Number, res: Response) => {
    const notesRepo = getRepository(Note);
    const note = await notesRepo
      .createQueryBuilder("note")
      // .innerJoinAndSelect("comments.note", "note", "comments")
      .innerJoinAndSelect("note.user", "user")
      // .innerJoinAndSelect("comments.note", "comments")
      .loadAllRelationIds()
      .where("note.id = :id", { id })
      .getOne();

    if (note) {
      const commentsRepo = getRepository(Comment);
      const comments = await commentsRepo.find({ where: { note: note?.id } });
      note.comments = comments;
      res.status(200).json(note);
    } else {
      res.status(404).send("No note found");
    }
  };
}
