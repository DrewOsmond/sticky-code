import { Note } from "../entity/Note";
import { createQueryBuilder, getRepository } from "typeorm";
import { validate, ValidationError } from "class-validator";
import { Request, Response } from "express";
import { getValidationErrors } from "./errors";
// import { Comment } from "../entity/Comment";
import { User } from "../entity/User";

// const notesRepo = getRepository(Note);

export class Notes {
  static addNote = async (req: Request, res: Response) => {
    const { note, user } = req.body;
    const { collectionId, title, description, language } = note;
    const notesRepo = getRepository(Note);

    const newNote = new Note();
    newNote.collection = collectionId;
    newNote.user = user;
    newNote.title = title;
    newNote.description = description;
    newNote.language = language;

    const potentialErrors: ValidationError[] = await validate(note);
    if (potentialErrors.length > 0) {
      return res.status(404).send(getValidationErrors(potentialErrors));
    }

    await notesRepo.save(newNote);
    return res.status(201).json(newNote);
  };

  static deleteNote = async (req: Request, res: Response) => {
    const { note, user } = req.body;
    if (note.user.id !== user.id) {
      res.status(400).send("not authorized");
    }

    const notesRepo = getRepository(Note);
    await notesRepo.remove(note);
    res.sendStatus(201);
  };

  static updateNote = async (req: Request, res: Response) => {
    const { note, title, description, user } = req.body;
    if (note.user.id !== user.id) {
      res.status(400).send("not authorized");
    }
    const notesRepo = getRepository(Note);

    note.title = title;
    note.description = description;

    await notesRepo.save(note);
    return res.status(200).json(note);
  };

  static getNote = async (id: Number, res: Response) => {
    const note = await createQueryBuilder(Note, "note")
      .innerJoinAndSelect("note.user", "user")
      .leftJoinAndSelect("note.collection", "collection")
      .leftJoinAndSelect("note.comments", "comments")
      .leftJoinAndSelect("comments.user", "users")
      .where("note.id = :id", { id })
      .getOne();

    if (note) {
      res.status(200).json(note);
    } else {
      res.json({
        id: 0,
        language: "",
        title: "no note found",
        user: { id: 0, username: 404 },
      });
    }
  };

  static addFavoriteNotes = async (req: Request, res: Response) => {
    const { user, note } = req.body;
    const userTable = getRepository(User);
    user.favorite_notes = [...user.favorite_notes, note];
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
