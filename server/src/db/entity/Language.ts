import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";

@Entity("languages")
@Unique(["name"])
export class Language {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  name: string;
}
