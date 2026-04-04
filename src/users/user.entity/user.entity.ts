import { NotNull } from "sequelize-typescript";
import { Column, Entity, Not, PrimaryGeneratedColumn } from "typeorm";

@Entity("users") 
export class UserEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 100, nullable: true })
  first_name?: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  last_name?: string;

  @Column({ type: "varchar", length: 255, unique: true })
  email!: string;

  @Column({ type: "varchar", length: 255 })
  password!: string;

  @Column({ type: "varchar", default: "active" })
  status!: string;

  @Column({ type: "timestamp", default: () => "now()" })
  created_at!: Date;

  @Column({ type: "timestamp", default: () => "now()" })
  updated_at!: Date;
}