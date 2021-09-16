import { /*Request,*/ Response } from "express";
import { /*createQueryBuilder,*/ getRepository, Like } from "typeorm";
import { Note } from "../entity/Note";

export class Searches {
  static searchNotes = async (res: Response, params: string[]) => {
    const [language, searchterm] = params;
    console.log(language);
    // const query = await createQueryBuilder(Note, "note")
    //   .innerJoin("note.category", "categories")
    //   .where("note.title = :title", {
    //     title: Like(`%${searchterm}%`),
    //   })
    //   .andWhere("note.language = :language", { language })
    //   .getMany();
    const NoteRepo = getRepository(Note);
    const query = await NoteRepo.find({
      where: [
        { title: Like(`%${searchterm}%`) },
        { language },
        { description: Like(`%${searchterm}%`) },
      ],
    });

    if (query.length) {
      console.log("queryyyy", query);
      res.json(query);
    } else {
      console.log(query);
      res.status(200).send(["no searches found"]);
    }
  };
}
