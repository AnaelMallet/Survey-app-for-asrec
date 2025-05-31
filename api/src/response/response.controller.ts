import {
  Body,
  Controller,
  Get, 
  Ip,
  Param,
  Post
} from "@nestjs/common"

import { ResponseService, surveyProportions } from "./response.service"

@Controller("response")
export class ResponseController {
  constructor(
    private readonly responseService: ResponseService
  ) {}

  @Post("/:uuid")
  async fetchResponse(
    @Param("uuid") surveyId: string,
    @Ip() IpAddress: string,
    @Body("responses") responses: number[]
  ): Promise<void> {
    return await this.responseService.fetchResponses({
      surveyId,
      IpAddress,
      responses
    })
  }

  @Get("/getBySurvey/:uuid")
    async getOneSurvey(
      @Param("uuid") surveyId: string
    ): Promise<surveyProportions> {
      return await this.responseService.getResponseStatistics(surveyId)
    }
}