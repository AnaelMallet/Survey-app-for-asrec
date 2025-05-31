import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

import { SurveyRepository } from "src/survey/survey.repository"

import { Response } from "./response.entity"
import { ResponseService } from "./response.service"
import { ResponseController } from "./response.controller"
import { ResponseRepository } from "./response.repository"

@Module({
  imports: [TypeOrmModule.forFeature([Response])],
  exports: [ResponseService],
  providers: [
    ResponseService,
    ResponseRepository,
    SurveyRepository
  ],
  controllers: [ResponseController]
})

export class ResponseModule {}