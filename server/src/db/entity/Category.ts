import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Note } from "./Note";

@Entity("categories")
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Note, (note) => note.category, { onDelete: "CASCADE" })
  notes: Note[];

  @Column({ nullable: false })
  name: string;
}
