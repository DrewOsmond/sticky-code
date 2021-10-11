import { /*Request,*/ Response } from "express";
import { /*createQueryBuilder,*/ getRepository, Like } from "typeorm";
import { Note } from "../entity/Note";

export class Searches {
  static searchNotes = async (res: Response, params: string[]) => {
    const [searchterm] = params;
    const NoteRepo = getRepository(Note);
    const query = await NoteRepo.find({
      where: [
        { title: Like(`%${searchterm}%`) },
        { description: Like(`%${searchterm}%`) },
      ],
    });

    if (query.length) {
      res.json(query);
    } else {
      res.status(200).send(["no searches found"]);
    }
  };

  static getRecent = async (res: Response) => {
    const notesRepo = getRepository(Note);
    const recentNotes = await notesRepo.find({ order: { created_at: "DESC" } });
    res.json(recentNotes);
  };
}
