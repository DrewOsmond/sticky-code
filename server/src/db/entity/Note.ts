import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { User } from "./User";
import { Category } from "./Category";

@Entity("notes")
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Category, (catagory) => catagory.id)
  category_id: number;

  @ManyToOne(() => User, (user) => user.id)
  user_id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false, type: "text" })
  description: string;

  @CreateDateColumn()
  created_at: Date;
}
