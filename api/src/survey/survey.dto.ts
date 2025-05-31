import { IsNotEmpty } from "class-validator"

import AnswerDto from "./answer.dto"

export class SurveyDto {
  @IsNotEmpty()
  readonly subject: string

  @IsNotEmpty()
  readonly description: string

  @IsNotEmpty()
  readonly answers: AnswerDto[]

  readonly isUniqueUser: boolean
  
  readonly isUniqueResponse: boolean
}