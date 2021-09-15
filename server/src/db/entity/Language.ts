import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
} from "typeorm";
import { Category } from "./Category";
@Entity("languages")
@Unique(["name"])
export class Language {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  name: string;

  @OneToMany(() => Category, (category) => category.language, {
    onDelete: "CASCADE",
  })
  categories: Category[];
}
