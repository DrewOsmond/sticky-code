"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Searches = void 0;
const typeorm_1 = require("typeorm");
const Note_1 = require("../entity/Note");
class Searches {
}
exports.Searches = Searches;
Searches.searchNotes = async (res, params) => {
    const [searchterm] = params;
    const NoteRepo = typeorm_1.getRepository(Note_1.Note);
    const query = await NoteRepo.find({
        where: [
            { title: typeorm_1.Like(`%${searchterm}%`) },
            { description: typeorm_1.Like(`%${searchterm}%`) },
        ],
    });
    if (query.length) {
        res.json(query);
    }
    else {
        res.status(200).send(["no searches found"]);
    }
};
Searches.getRecent = async (res) => {
    const notesRepo = typeorm_1.getRepository(Note_1.Note);
    const recentNotes = await notesRepo.find({ order: { created_at: "DESC" } });
    res.json(recentNotes);
};
//# sourceMappingURL=search.js.map