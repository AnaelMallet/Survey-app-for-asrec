import { Module } from '@nestjs/common'
import { TypeOrmModule } from "@nestjs/typeorm"

import { ormConfig } from "../ormconfig"

import { SurveyModule } from './survey/survey.module'
import { ResponseModule } from './response/response.module'

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    SurveyModule,
    ResponseModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}