import { IsNotEmpty } from "class-validator"

export class responsesDto {
  readonly surveyId: string

  readonly IpAddress: string
  
  @IsNotEmpty()
  readonly responses: number[]
}