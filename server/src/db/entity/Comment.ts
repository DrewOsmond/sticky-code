import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { User } from "./User";
import { Note } from "./Note";

@Entity("comments")
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @ManyToOne(() => Note, (note) => note.comments)
  note: Note;

  @Column({ nullable: false, type: "text" })
  description: string;

  @CreateDateColumn()
  created_at: Date;
}
