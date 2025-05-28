import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

import { Survey } from "./survey.entity"
import { SurveyService } from "./survey.service"
import { SurveyController } from "./survey.controller"

@Module({
  imports: [TypeOrmModule.forFeature([Survey])],
  exports: [SurveyService],
  providers: [SurveyService],
  controllers: [SurveyController]
})

export class SurveyModule {}