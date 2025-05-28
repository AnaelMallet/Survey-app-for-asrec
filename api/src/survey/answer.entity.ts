import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne
} from "typeorm"

import { Survey } from "./survey.entity"

@Entity({ name: 'answers' })
export class AnswerEntity extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number

  @Column("text")
  response: string

  @ManyToOne(() => Survey, survey => survey.answers)
  @JoinColumn({ name: "survey_uuid" })
  survey: Survey
}