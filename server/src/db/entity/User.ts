import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
} from "typeorm";
import { Length, IsEmail } from "class-validator";
import * as bcrypt from "bcrypt";
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
