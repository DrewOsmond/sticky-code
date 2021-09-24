import { Collection } from "../entity/Collection";
import { getRepository, createQueryBuilder } from "typeorm";
import { Request, Response } from "express";
// import { validate, ValidationError } from "class-validator";
// import { getValidationErrors } from "./errors";

export class Collections {
  static getOne = async (req: Request, res: Response) => {
    const id = req.params.id;
    const username = req.params.user;
    const query = await createQueryBuilder(Collection, "collections")
      .leftJoinAndSelect("collections.notes", "notes")
      .leftJoinAndSelect("notes.collection", "collection")
      .leftJoinAndSelect("collections.user", "user")
      .leftJoinAndSelect("notes.user", "notes_user")
      .leftJoinAndSelect("collections.added_notes", "added_notes")
      .leftJoinAndSelect("added_notes.collection", "collectionz")
      .leftJoinAndSelect("added_notes.user", "user_notes")
      .where("collections.id = :id", { id })
      .andWhere("user.username = :username", { username })
      .getOne();

    if (query) {
      res.json(query);
    } else
      res.status(404).json({
        id: 0,
      });
  };

  static addCollection = async (req: Request, res: Response) => {
    const { name, user, personal } = req.body;
    const collectionsRepo = getRepository(Collection);
    const newCollection = new Collection();
    newCollection.name = name;
    newCollection.user = user;
    newCollection.personal = personal;
    newCollection.added_notes = [];

    const saving = await collectionsRepo.save(newCollection);
    if (saving) {
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

  static addNoteToCollection = async (req: Request, res: Response) => {
    const { collection, note } = req.body;
    const collectionRepo = getRepository(Collection);
    collection.added_notes.push(note);
    const saving = await collectionRepo.save(collection);

    if (saving) {
      res.json(saving);
    } else res.sendStatus(400);
  };

  static deleteNoteFromCollection = async (req: Request, res: Response) => {
    const { collection, note } = req.body;
    const collectionRepo = getRepository(Collection);
    collection.added_notes = collection.added_notes.filter(
      (ele: { id: number }) => ele.id !== note.id
    );
    const updatedCollection = await collectionRepo.save(collection);
    if (updatedCollection) {
      res.json(updatedCollection);
    }
  };
}
