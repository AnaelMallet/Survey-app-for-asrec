import { DataSource, DataSourceOptions } from "typeorm"
import { SnakeNamingStrategy } from "typeorm-naming-strategies"

const ormConfig: DataSourceOptions = {
  type: "postgres",
  host: process.env.DATABASE_HOST,
  port: 5432,
  username: "postgres",
  password: "admin",
  database: "survey_app",
  synchronize: true,
  logging: true,
  namingStrategy: new SnakeNamingStrategy(),
  entities: [__dirname + '/**/*.entity{.ts,.js}']
}

const appDataSource = new DataSource(ormConfig)

appDataSource.initialize().then(() => {
  console.log("database is initialized")
}).catch((err) => {
  console.error(err)
})

export {
  ormConfig, 
  appDataSource
}