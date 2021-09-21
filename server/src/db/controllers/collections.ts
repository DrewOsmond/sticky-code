import { Collection } from "../entity/Collection";
import { getRepository } from "typeorm";
import { Request, Response } from "express";
// import { validate, ValidationError } from "class-validator";
// import { getValidationErrors } from "./errors";

export class Collections {
  static addCollection = async (req: Request, res: Response) => {
    const { name, user, personal } = req.body;
    const collectionsRepo = getRepository(Collection);
    const newCollection = new Collection();
    newCollection.name = name;
    newCollection.user = user;
    newCollection.personal = personal;
    // newCollection.public = public;

    const saving = await collectionsRepo.save(newCollection);
    if (saving) {
      console.log("THIS IS WHAT SAVING RETURNS  ", saving);
      res.json(newCollection);
    } else res.sendStatus(400);
  };

  static deleteCollection = async (req: Request, res: Response) => {
    const { collection } = req.body;
    const collectionsRepo = getRepository(Collection);
    await collectionsRepo.remove(collection);
    res.sendStatus(201);
  };

  static editCollection = async (req: Request, res: Response) => {
    const { collection, name } = req.body;
    const collectionsRepo = getRepository(Collection);
    collection.name = name;
    await collectionsRepo.save(collection);
    res.json(collection);
  };

  static addFavorite = async (req: Request, res: Response) => {
    const { user, collection } = req.body;
    const userTable = getRepository(user);
    user.favorite_collections = [...user.favorite_collections, collection];
    const data = await userTable.save(user);
    if (data) res.json(user);
    else res.sendStatus(400);
  };

  static removeFavorite = async (req: Request, res: Response) => {
    const { user, collection } = req.body;
    const userTable = getRepository(user);
    user.favorite_collections = user.favorite_collections.filter(
      (collectionToKeep: { id: number }) =>
        collectionToKeep.id !== collection.id
    );
    const data = await userTable.save(user);
    if (data) res.json(user);
    else res.sendStatus(404);
  };
}
