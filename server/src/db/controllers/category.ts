import { Category } from "../entity/Category";
import { getRepository } from "typeorm";
import { Request, Response } from "express";

export class Categories {
  static getAll = async (req: Request, res: Response) => {
    const { languageId } = req.body;
    const languageRepo = getRepository(Category);
    const categoriesOfLanguage = await languageRepo.find({
      where: { languageId },
    });

    if (categoriesOfLanguage) {
      return res.status(200).json(categoriesOfLanguage);
    } else {
      return res.status(400);
    }
  };
}
