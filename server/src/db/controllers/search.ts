import { /*Request,*/ Response } from "express";
import { createQueryBuilder, Like } from "typeorm";
import { Note } from "../entity/Note";

export class Searches {
  static searchNotes = async (res: Response, params: string[]) => {
    const [language, searchterm] = params;
    const query = await createQueryBuilder(Note, "n")
      .innerJoin("n.category", "categories")
      .where("notes.title = :title", {
        title: Like(`%${searchterm}%`),
      })
      .andWhere("notes.language = :language", { language })
      .getMany();

    if (query?.length) {
      res.json(query);
    }
  };
}
