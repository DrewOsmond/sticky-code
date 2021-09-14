import { Language } from "src/db/entity/Language";
import { getRepository } from "typeorm";
import { Request, Response } from "express";

export class Languages {
  static add = async (req: Request, res: Response) => {
    const { language } = req.body;

    const languageTable = getRepository(Language);
    const languageToAdd = new Language();
    languageToAdd.name = language;

    await languageTable
      .save(languageToAdd)
      .then(() => res.status(201).send(languageToAdd))
      .catch(console.log);
  };

  static getAll = async (_req: Request, res: Response) => {
    const languageTable = getRepository(Language);
    const languages: Response | void = await languageTable
      .find({
        order: {
          name: "ASC",
        },
      })
      .then(() => res.status(200).send(languages))
      .catch(console.log);
  };
}
