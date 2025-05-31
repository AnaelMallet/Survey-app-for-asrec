import { IsNotEmpty } from "class-validator"

export default class AnswerDto {
  @IsNotEmpty()
  response: string
}