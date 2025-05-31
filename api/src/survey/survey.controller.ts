import {
  Body,
  Controller,
  Get,
  Param,
  Post
} from "@nestjs/common"

import { SurveyService } from "./survey.service"
import { SurveyDto } from "./survey.dto"
import { Survey } from "./survey.entity"

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

  @Get("/getAll")
  async getAllSurvey(): Promise<Survey[]> {
    return await this.surveyService.getAllSurveys()
  }

  @Get("/getOne/:uuid")
  async getOneSurvey(
    @Param("uuid") surveyId: string
  ): Promise<Survey> {
    return await this.surveyService.getOneSurvey(surveyId)
  }
}