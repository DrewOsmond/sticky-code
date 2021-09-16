import { Category } from "../entity/Category";
import { getRepository /*Like*/ } from "typeorm";
import { Request, Response } from "express";

export class Categories {
  static getAll = async (_req: Request, res: Response) => {
    // const { languageId } = req.body;
    const categoryRepo = getRepository(Category);
    const categoriesOfLanguage = await categoryRepo
      .createQueryBuilder()
      .getMany();

    if (categoriesOfLanguage) {
      return res.status(200).json(categoriesOfLanguage);
    } else {
      return res.status(400);
    }
  };
}
