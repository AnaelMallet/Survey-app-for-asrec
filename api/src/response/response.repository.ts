import { Injectable } from "@nestjs/common"
import { DataSource, Repository } from "typeorm"

import { Response } from "./response.entity"

@Injectable()
export class ResponseRepository extends Repository<Response> {
  alias = "responses"

  constructor(dataSource: DataSource) {
    super(Response, dataSource.createEntityManager())
  }

  async findAllBySurveyId(surveyId: string): Promise<Response[]> {
    return await this
      .createQueryBuilder(this.alias)
      .where(`${this.alias}.survey_uuid = :surveyId`, { surveyId })
      .getMany()
  }

  async createResponse(entity: Response): Promise<void> {
    await this.save(entity)
  }
}