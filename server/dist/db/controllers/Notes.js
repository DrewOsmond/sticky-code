"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notes = void 0;
const Note_1 = require("../entity/Note");
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const errors_1 = require("./errors");
const User_1 = require("../entity/User");
class Notes {
}
exports.Notes = Notes;
Notes.addNote = async (req, res) => {
    const { note, user } = req.body;
    const { collectionId, title, description, language } = note;
    const notesRepo = typeorm_1.getRepository(Note_1.Note);
    const newNote = new Note_1.Note();
    newNote.collection = collectionId;
    newNote.user = user;
    newNote.title = title;
    newNote.description = description;
    newNote.language = language;
    const potentialErrors = await class_validator_1.validate(note);
    if (potentialErrors.length > 0) {
        return res.status(404).send(errors_1.getValidationErrors(potentialErrors));
    }
    await notesRepo.save(newNote);
    return res.status(201).json(newNote);
};
Notes.deleteNote = async (req, res) => {
    const { note, user } = req.body;
    if (note.user.id !== user.id) {
        res.status(400).send("not authorized");
    }
    const notesRepo = typeorm_1.getRepository(Note_1.Note);
    await notesRepo.remove(note);
    res.sendStatus(201);
};
Notes.updateNote = async (req, res) => {
    const { note, title, description, user } = req.body;
    if (note.user.id !== user.id) {
        res.status(400).send("not authorized");
    }
    const notesRepo = typeorm_1.getRepository(Note_1.Note);
    note.title = title;
    note.description = description;
    await notesRepo.save(note);
    return res.status(200).json(note);
};
Notes.getNote = async (id, res) => {
    const note = await typeorm_1.createQueryBuilder(Note_1.Note, "note")
        .innerJoinAndSelect("note.user", "user")
        .leftJoinAndSelect("note.collection", "collection")
        .leftJoinAndSelect("note.comments", "comments")
        .leftJoinAndSelect("comments.user", "users")
        .where("note.id = :id", { id })
        .getOne();
    if (note) {
        note.user.password =
            "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley";
        res.status(200).json(note);
    }
    else {
        res.json({
            id: 0,
            language: "",
            title: "no note found",
            user: { id: 0, username: 404 },
        });
    }
};
Notes.addFavoriteNotes = async (req, res) => {
    const { user, note } = req.body;
    const userTable = typeorm_1.getRepository(User_1.User);
    user.favorite_notes = [...user.favorite_notes, note];
    await userTable.save(user);
    res.sendStatus(200);
};
Notes.removeFavoriteNotes = async (req, res) => {
    const { user, note } = req.body;
    const userTable = typeorm_1.getRepository(User_1.User);
    user.favorite_notes = user.favorite_notes.filter((noteToKeep) => noteToKeep.id !== note.id);
    await userTable.save(user);
    res.sendStatus(201);
};
//# sourceMappingURL=Notes.js.map