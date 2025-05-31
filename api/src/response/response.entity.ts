import {
  Entity,
  Column,
  BaseEntity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm"

import { Survey } from "../survey/survey.entity"

@Entity({ name: 'responses' })
export class Response extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  uuid: string

  @Column("varchar", { length: 16 })
  IpAddress: string

  @ManyToOne(() => Survey, survey => survey.responses)
  @JoinColumn({ name: "survey_uuid" })
  survey: Survey

  @Column("int", { array: true })
  responses: number[]
}