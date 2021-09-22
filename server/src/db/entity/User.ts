import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
  OneToMany,
  JoinTable,
  ManyToMany,
} from "typeorm";
import { Length, IsEmail } from "class-validator";
import * as bcrypt from "bcrypt";
import { Note } from "./Note";
import { Comment } from "./Comment";
import { Collection } from "./Collection";
// import { Favorite } from "./Favorite";

@Entity("users")
@Unique(["username", "email"])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", unique: true, nullable: false })
  @Length(4, 12)
  username: string;

  @Column({ type: "varchar", unique: true, nullable: false })
  @IsEmail()
  email: string;

  @Column({ type: "varchar", nullable: false })
  @Length(8, 100)
  password: string;

  @OneToMany(() => Note, (note) => note.user, { onDelete: "CASCADE" })
  notes: Note[];

  @OneToMany(() => Comment, (comment) => comment.user, { onDelete: "CASCADE" })
  comments: Comment[];

  @OneToMany(() => Collection, (collections) => collections.user)
  collections: Collection[];

  @ManyToMany(() => Note, {
    cascade: true,
  })
  @JoinTable()
  favorite_notes: Note[];

  // @ManyToMany(() => Collection, { cascade: true })
  // @JoinTable()
  // favorite_collections: Collection[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  stringPasswordToHashed(): void {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  checkValidPassword(passwordToCheck: string) {
    return bcrypt.compareSync(passwordToCheck, this.password);
  }
}
