import {
  Entity,
  Column,
  BaseEntity,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm"

import { Response } from "../response/response.entity"

import { AnswerEntity } from "./answer.entity"

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

  @OneToMany(() => Response, response => response.survey)
  responses: Response[]
}