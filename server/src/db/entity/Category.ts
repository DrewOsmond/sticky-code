import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Language } from "./Language";
import { Note } from "./Note";

@Entity("categories")
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Language, (language) => language.categories)
  language: Language;

  @OneToMany(() => Note, (note) => note.category, { onDelete: "CASCADE" })
  notes: Note[];

  @Column({ nullable: false, unique: true })
  name: string;
}
