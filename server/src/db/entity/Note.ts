import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  OneToMany,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { Comment } from "./Comment";
import { Collection } from "./Collection";

@Entity("notes")
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Collection, (collection) => collection.notes)
  collection: Collection;

  @ManyToOne(() => User, (user) => user.notes)
  user: User;

  @OneToMany(() => Comment, (comment) => comment.note, { onDelete: "CASCADE" })
  comments: Comment[];

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  language: string;

  @Column({ nullable: false, type: "text" })
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
