import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
} from "typeorm";

@Entity("languages")
@Unique(["username", "email"])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  
}
