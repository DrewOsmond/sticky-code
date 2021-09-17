import { Note } from "../entity/Note";
import { getRepository } from "typeorm";
import { validate, ValidationError } from "class-validator";
import { Request, Response } from "express";
import { getValidationErrors } from "./errors";

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
    const { id } = req.body;
    const notesRepo = getRepository(Note);
    const noteToDelete: Note | undefined = await notesRepo.findOne(id);

    if (noteToDelete) {
      notesRepo.delete(noteToDelete);
      return res.status(202).send(id);
    } else {
      return res.status(400);
    }
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
    const note = await notesRepo.findOne({ where: { id } });
    if (note) {
      res.status(200).json(note);
    } else {
      res.status(404).send("No note found");
    }
  };

}
