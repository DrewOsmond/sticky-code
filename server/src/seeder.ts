import { getRepository } from "typeorm";
// import { Category } from "./db/entity/Category";
import { Comment } from "./db/entity/Comment";

export const addComments = async () => {
  const categoryRepo = getRepository(Comment);
  const comments = ["OH WOW COOL", "ts, huh?", "POGGIES BR0"];

  for (let val of comments) {
    const comment = new Comment();
    comment.description = val;
    comment.note = 21 as any;
    comment.user = 1 as any;

    await categoryRepo.save(comment);
  }
};
