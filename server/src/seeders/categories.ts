import { Category } from "../db/entity/Category";
// import { User } from "../db/entity/User";
import { getRepository } from "typeorm";
// import { Note } from "../db/entity/Note";

// const addNotes = async () => {
//   const cateRepo = getRepository(Category);
//   const userRepo = getRepository(User);
//   const noteRepo = getRepository(Note);
//   const category = await cateRepo.findOne({ where: { id: 2 } });
//   const user = await userRepo.findOne({ where: { id: 1 } });
//   if (category && user) {
//     const notesToAdd = [
//       [
//         "dot notation vs bracket notation",
//         "Dot notation uses object literals, meaning you can just do object.value, while bracket notations require you to either use a string or a reference to a variable. like object['value'] or you can save the 'value' to a string and reference that within the brackets",
//       ],
//     ];

//     for (let vals of notesToAdd) {
//       const newNote = new Note();
//       newNote.category = category;
//       newNote.user = user;
//       newNote.title = vals[0];
//       newNote.description = vals[1];

//       await noteRepo.save(newNote);
//     }
//   }
// };

// export default addNotes;

const addCategories = async () => {
  const cateRepo = getRepository(Category);
  const vals = ["functions", "objects", "arrays", "strings"];

  for (let val of vals) {
    const newCat = new Category();
    newCat.name = val;
    await cateRepo.save(newCat);
  }
};

export default addCategories;
