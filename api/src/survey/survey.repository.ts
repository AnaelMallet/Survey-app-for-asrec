import { Injectable } from "@nestjs/common"
import { DataSource, Repository } from "typeorm"

import { Survey } from "./survey.entity"

@Injectable()
export class SurveyRepository extends Repository<Survey> {
  alias = "surveys"

  constructor(dataSource: DataSource) {
    super(Survey, dataSource.createEntityManager())
  }

  async findAll(): Promise<Survey[]> {
    return await this
      .createQueryBuilder(this.alias)
      .leftJoinAndSelect(
        `${this.alias}.responses`,
        "survey_responses",
        `${this.alias}.is_unique_user = true`
      )
      .getMany()
  }

  async findOneByUuid(uuid: string): Promise<Survey> {
    return await this
      .createQueryBuilder(this.alias)
      .innerJoinAndSelect(`${this.alias}.answers`, "survey_answers")
      .leftJoinAndSelect(
        `${this.alias}.responses`,
        "survey_responses",
        `${this.alias}.is_unique_user = true`)
      .where(`${this.alias}.uuid = :uuid`, { uuid })
      .getOne()
  }

  async createSurvey(entity: Survey): Promise<void> {
    await this.save(entity)
  }
}