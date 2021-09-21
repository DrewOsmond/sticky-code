import { Note } from "../entity/Note";
import { getRepository } from "typeorm";
import { validate, ValidationError } from "class-validator";
import { Request, Response } from "express";
import { getValidationErrors } from "./errors";
import { Comment } from "../entity/Comment";
import { User } from "../entity/User";

// const notesRepo = getRepository(Note);

export class Notes {
  static addNote = async (req: Request, res: Response) => {
    const { title, description, collectionId, id, language } = req.body;
    const notesRepo = getRepository(Note);

    const note = new Note();
    note.collection = collectionId;
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
    const { note, title, description } = req.body;
    const notesRepo = getRepository(Note);

    note.title = title;
    note.description = description;

    await notesRepo.save(note);
    return res.status(200).json(note);
  };

  static getNote = async (id: Number, res: Response) => {
    const notesRepo = getRepository(Note);
    const note = await notesRepo
      .createQueryBuilder("note")
      .innerJoinAndSelect("note.user", "user")
      .where("note.id = :id", { id })
      .getOne();

    if (note) {
      const commentsRepo = getRepository(Comment);
      const comments = await commentsRepo
        .createQueryBuilder("comments")
        .where("comments.note = :id", { id: note.id })
        .leftJoinAndSelect("comments.user", "user")
        .getMany();
      note.comments = comments;
      res.status(200).json(note);
    } else {
      res.status(404).send("No note found");
    }
  };

  static addFavoriteNotes = async (req: Request, res: Response) => {
    const { user, note } = req.body;
    const userTable = getRepository(User);
    user.favorites = [...user.favorites, note];
    await userTable.save(user);
    res.sendStatus(200);
  };

  static removeFavoriteNotes = async (req: Request, res: Response) => {
    const { user, note } = req.body;
    const userTable = getRepository(User);
    user.favorite_notes = user.favorite_notes.filter(
      (noteToKeep: Note) => noteToKeep.id !== note.id
    );
    await userTable.save(user);
    res.sendStatus(201);
  };
}
