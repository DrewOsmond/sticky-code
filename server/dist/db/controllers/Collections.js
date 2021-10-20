"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collections = void 0;
const Collection_1 = require("../entity/Collection");
const typeorm_1 = require("typeorm");
class Collections {
}
exports.Collections = Collections;
Collections.getOne = async (req, res) => {
    const id = req.params.id;
    const username = req.params.user;
    const query = await typeorm_1.createQueryBuilder(Collection_1.Collection, "collections")
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
    }
    else
        res.status(404).json({
            id: 0,
        });
};
Collections.addCollection = async (req, res) => {
    const { name, user, personal } = req.body;
    const collectionsRepo = typeorm_1.getRepository(Collection_1.Collection);
    const newCollection = new Collection_1.Collection();
    newCollection.name = name;
    newCollection.user = user;
    newCollection.personal = personal;
    newCollection.added_notes = [];
    const saving = await collectionsRepo.save(newCollection);
    if (saving) {
        res.json(newCollection);
    }
    else
        res.sendStatus(400);
};
Collections.deleteCollection = async (req, res) => {
    const { collection, user } = req.body;
    if (collection.user.id !== user.id) {
        return res.status(400).send("not authorized");
    }
    const collectionsRepo = typeorm_1.getRepository(Collection_1.Collection);
    await collectionsRepo.remove(collection);
    return res.sendStatus(201);
};
Collections.editCollection = async (req, res) => {
    const { collection, name, isPersonal, user } = req.body;
    if (collection.user.id !== user.id) {
        return res.status(400).json("not authorized");
    }
    const collectionsRepo = typeorm_1.getRepository(Collection_1.Collection);
    collection.name = name;
    collection.personal = isPersonal;
    await collectionsRepo.save(collection);
    return res.json(collection);
};
Collections.addNoteToCollection = async (req, res) => {
    const { collection, note } = req.body;
    const collectionRepo = typeorm_1.getRepository(Collection_1.Collection);
    collection.added_notes.push(note);
    const saving = await collectionRepo.save(collection);
    if (saving) {
        return res.json(saving);
    }
    else
        return res.sendStatus(400);
};
Collections.deleteNoteFromCollection = async (req, res) => {
    const { collection, note, user } = req.body;
    if (collection.user.id !== user.id) {
        return res.sendStatus(500);
    }
    const collectionRepo = typeorm_1.getRepository(Collection_1.Collection);
    collection.added_notes = collection.added_notes.filter((ele) => ele.id !== note.id);
    const updatedCollection = await collectionRepo.save(collection);
    if (updatedCollection) {
        return res.json(updatedCollection);
    }
    else {
        return res.sendStatus(500);
    }
};
//# sourceMappingURL=Collections.js.map