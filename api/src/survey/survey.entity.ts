import {
  Entity,
  Column,
  PrimaryColumn,
  BaseEntity,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm"

import { AnswerEntity } from "./answer.entity"
import { UserEntity } from "../user/user.entity"

@Entity({ name: 'surveys' })
export class Survey extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  uuid: string

  @Column("text")
  subject: string

  @Column("text")
  description: string

  @Column("boolean")
  isUniqueUser: boolean

  @Column("boolean")
  isUniqueAnswer: boolean

  @OneToMany(
    () => AnswerEntity,
    answer => answer.survey, {
      cascade: ["insert"]
    })
  answers: AnswerEntity[]

  @OneToMany(() => UserEntity, user => user.survey)
  users: UserEntity[]
}