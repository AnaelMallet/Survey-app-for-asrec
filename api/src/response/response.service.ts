import { Injectable } from "@nestjs/common"

import { Survey } from "src/survey/survey.entity"
import { SurveyRepository } from "src/survey/survey.repository"

import { Response } from "./response.entity"
import { responsesDto } from "./response.dto"
import { ResponseRepository } from "./response.repository"

type proportionResponse = {
  response: number
  percentage: number
}

type Answer = {
  id: number
  response: string
}

export type surveyProportions = {
  subject: string
  description: string
  answers: Answer[]
  proportions: proportionResponse[]
}

@Injectable()
export class ResponseService {
    constructor(
    private repository: ResponseRepository,
    private surveyRepository: SurveyRepository
  ) {}

  async fetchResponses(dto: responsesDto): Promise<void> {
    const newResponse = new Response()
    const newSurvey = new Survey()

    newSurvey.uuid = dto.surveyId
    
    Object.assign(newResponse, {...dto, survey: newSurvey})

    return await this.repository.createResponse(newResponse)
  }

  async getResponseStatistics(surveyId: string): Promise<surveyProportions> {
    const survey = await this.surveyRepository.findOneByUuid(surveyId)
    const responses = await this.repository.findAllBySurveyId(surveyId)
    const responseNumber = responses.length

    let allSelectedResponses = []
    let proportionValues = {}

    for (const response of responses) {
      allSelectedResponses = allSelectedResponses.concat(response.responses)
    }

    allSelectedResponses.map((selectedResponse) => {
      proportionValues[selectedResponse] = (proportionValues[selectedResponse] || 0) + 1
    })

    const statisticsArray = Object.entries(proportionValues).map((e) => ( { [e[0]]: e[1] } )) as [{[x: string]: number}]
    const percentageStats: proportionResponse[] = []

    for (const statistic of statisticsArray) {
      percentageStats.push({
        response: parseInt(Object.keys(statistic)[0], 10),
        percentage: (Object.values(statistic)[0] / responseNumber) * 100
      })
    }

    const surveyProppostion: surveyProportions = {
      subject: survey.subject,
      description: survey.description,
      answers: survey.answers,
      proportions: percentageStats
    }

    return surveyProppostion
  }
}