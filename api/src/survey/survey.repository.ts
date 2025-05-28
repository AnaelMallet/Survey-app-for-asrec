import BasicRepository from "src/shared/basicRepository"

import { Survey } from "./survey.entity"

export class SurveyRepository extends BasicRepository<Survey> {
  alias = "surveys"

  async findAll(): Promise<Survey[]> {
    return await this
      .repository
      .createQueryBuilder(this.alias)
      .select([
        "title",
        "description",
        "isUniqueUser"
      ])
      .getMany()
  }

  async findOneByUuid(uuid: string): Promise<Survey> {
    return await this
      .repository
      .createQueryBuilder(this.alias)
      .where(`${this.alias}.uuid = :uuid`, { uuid })
      .getOne()
  }

  async save(entity: Survey): Promise<void> {
    await this.repository.save(entity)
  }
}