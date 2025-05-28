import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common"

import { SurveyService } from "./survey.service"
import { SurveyDto } from "./survey.dto"

@Controller("survey")
export class SurveyController {
  constructor(
    private readonly surveyService: SurveyService
  ) {}

  @Post("/create")
  async createSurvey(
    @Body("survey") dto: SurveyDto
  ): Promise<void> {
    return await this.surveyService.createSurvey(dto)
  }
}