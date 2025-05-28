import { Module } from '@nestjs/common'
import { TypeOrmModule } from "@nestjs/typeorm"

import { SurveyModule } from './survey/survey.module'

import { ormConfig } from "../ormconfig"

import { AppController } from './app.controller'
import { AppService } from './app.service'


@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    SurveyModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
