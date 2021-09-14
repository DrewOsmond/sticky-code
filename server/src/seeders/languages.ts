import { Language } from "../db/entity/Language";
import { getRepository } from "typeorm";

export const addLanguages = () => {
  const arraysOfLanguages = [
    "javascript",
    "typescript",
    "go",
    "rust",
    "python",
  ];

  const languageTable = getRepository(Language);

  for (let vals of arraysOfLanguages) {
    const language = new Language();
    language.name = vals;
    languageTable.save(language);
  }
};
