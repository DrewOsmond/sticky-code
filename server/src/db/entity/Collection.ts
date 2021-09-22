import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { User } from "./User";
import { Note } from "./Note";

@Entity("collections")
export class Collection {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.collections, { onDelete: "CASCADE" })
  user: User;

  @OneToMany(() => Note, (note) => note.collection)
  notes: Note;

  @Column({ nullable: false, type: "text" })
  name: string;

  @Column({ nullable: false, type: "boolean" })
  personal: boolean;

  @ManyToMany(() => Note)
  @JoinTable()
  collection_notes: Note[];
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
