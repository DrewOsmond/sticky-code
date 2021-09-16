import { Note } from "../entity/Note";
import { getRepository } from "typeorm";
import { validate, ValidationError } from "class-validator";
import { Request, Response } from "express";
import { getValidationErrors } from "./errors";
import { User } from "../entity/User";
export class Notes {
  static addNote = async (req: Request, res: Response) => {
    const { title, description, categoriesId, id } = req.body;
    const usersRepo = getRepository(User);
    const NotesRepo = getRepository(Note);

    const user: User | undefined = await usersRepo.findOne({
      where: { id },
    });
    if (!user) return res.status(400).send("user not found");

    const note = new Note();
    note.category = categoriesId;
    note.user = user;
    note.title = title;
    note.description = description;

    const potentialErrors: ValidationError[] = await validate(note);
    if (potentialErrors.length > 0) {
      return res.status(404).send(getValidationErrors(potentialErrors));
    }

    await NotesRepo.save(note);
    return res.status(201).json(note);
  };

  static deleteNote = async (req: Request, res: Response) => {
    const { id } = req.body;
    const notesRepo = getRepository(Note);
    const noteToDelete: Note | undefined = await notesRepo.findOne(id);

    if (noteToDelete) {
      notesRepo.delete(noteToDelete);
      return res.status(202).send();
    } else {
      return res.status(400);
    }
  };

  static updateNote = async (req: Request, res: Response) => {
    const { id, title, descriptions } = req.body;
    const notesRepo = getRepository(Note);
    const noteToUpdate = await notesRepo.findOne({ where: { id } });
    if (!noteToUpdate) return res.status(400);

    noteToUpdate.title = title;
    noteToUpdate.description = descriptions;

    await notesRepo.save(noteToUpdate);
    return res.status(200).json(noteToUpdate);
  };
}
