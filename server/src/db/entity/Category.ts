import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  ManyToOne,
} from "typeorm";
import { Language } from "./Language";

@Entity("categories")
@Unique(["name"])
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Language, (language) => language.id)
  language_id: number;

  @Column({ nullable: false, unique: true })
  name: string;
}
