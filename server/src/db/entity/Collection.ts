import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { User } from "./User";
import { Note } from "./Note";

@Entity("collections")
export class Collection {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.collections)
  user: User;

  @OneToMany(() => Note, (note) => note.collection, {
    onDelete: "CASCADE",
  })
  notes: Note;

  @Column({ nullable: false, type: "text" })
  name: string;

  @Column({ nullable: false, type: "boolean" })
  personal: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
