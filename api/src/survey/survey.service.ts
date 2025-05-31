import { Injectable } from "@nestjs/common"

import { Survey } from "./survey.entity"
import { SurveyDto } from "./survey.dto"
import { SurveyRepository } from "./survey.repository"

@Injectable()
export class SurveyService {
    constructor(
    private repository: SurveyRepository
  ) {}

  async createSurvey(dto: SurveyDto): Promise<void> {
    const newSurvey = new Survey()
    
    Object.assign(newSurvey, dto)

    return await this.repository.createSurvey(newSurvey)
  }

  async getAllSurveys(): Promise<Survey[]> {
    return await this.repository.findAll()
  }

  async getOneSurvey(surveyId: string): Promise<Survey> {
    return await this.repository.findOneByUuid(surveyId)
  }
}