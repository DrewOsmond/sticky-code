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
      query.user.password =
        "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley";
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
    const { collection, user } = req.body;
    if (collection.user.id !== user.id) {
      return res.status(400).send("not authorized");
    }
    const collectionsRepo = getRepository(Collection);
    await collectionsRepo.remove(collection);
    return res.sendStatus(201);
  };

  static editCollection = async (req: Request, res: Response) => {
    const { collection, name, isPersonal, user } = req.body;
    if (collection.user.id !== user.id) {
      return res.status(400).json("not authorized");
    }
    const collectionsRepo = getRepository(Collection);
    collection.name = name;
    collection.personal = isPersonal;
    await collectionsRepo.save(collection);
    return res.json(collection);
  };

  static addNoteToCollection = async (req: Request, res: Response) => {
    const { collection, note } = req.body;

    const collectionRepo = getRepository(Collection);
    collection.added_notes.push(note);
    const saving = await collectionRepo.save(collection);

    if (saving) {
      return res.json(saving);
    } else return res.sendStatus(400);
  };

  static deleteNoteFromCollection = async (req: Request, res: Response) => {
    const { collection, note, user } = req.body;
    if (collection.user.id !== user.id) {
      return res.sendStatus(500);
    }
    const collectionRepo = getRepository(Collection);
    collection.added_notes = collection.added_notes.filter(
      (ele: { id: number }) => ele.id !== note.id
    );
    const updatedCollection = await collectionRepo.save(collection);
    if (updatedCollection) {
      return res.json(updatedCollection);
    } else {
      return res.sendStatus(500);
    }
  };
}
