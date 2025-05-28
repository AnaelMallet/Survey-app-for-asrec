import {
  Entity,
  Column,
  BaseEntity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn
} from "typeorm"

import { Survey } from "../survey/survey.entity"

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @PrimaryColumn()
  uuid: string

  @Column("text")
  IPAddress: string

  @ManyToOne(() => Survey, survey => survey.users)
  @JoinColumn({ name: "survey_uuid" })
  survey: Survey
}