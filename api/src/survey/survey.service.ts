import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"

import { Survey } from "./survey.entity"
import { SurveyDto } from "./survey.dto"
import { SurveyRepository } from "./survey.repository"

@Injectable()
export class SurveyService {
    constructor(
    @InjectRepository(Survey) private readonly surveyRepository: SurveyRepository
  ) {}

  async createSurvey(dto: SurveyDto) {
    const newSurvey = new Survey()
    
    Object.assign(newSurvey, dto)

    return await this.surveyRepository.save(newSurvey)
  }
}