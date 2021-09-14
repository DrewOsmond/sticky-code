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

  @ManyToOne(() => User, (user) => user.id)
  user_id: number;

  @ManyToOne(() => Note, (note) => note.id)
  note_id: number;

  @Column({ nullable: false, type: "text" })
  description: string;

  @CreateDateColumn()
  created_at: Date;
}
