import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { MongooseModule } from "@nestjs/mongoose";
import { LinksModule } from "./links/links.module";
import { ContentsModule } from "./contents/contents.module";
import { FilesModule } from "./files/files.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { CoursesModule } from "./courses/courses.module";
import { NewsModule } from "./news/news.module";
import { ProjectsModule } from "./projects/projects.module";
import { PublicationsModule } from "./publications/publications.module";
import { DepartmentsModule } from "./departments/departments.module";

import configuration from "./config/configuration";

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost/fameddbv2"),
    // MongooseModule.forRootAsync({
    //   inject: [ConfigService],
    //   useFactory: async (configService: ConfigService) => ({
    //     uri: configService.get("connectionUrl"),
    //   }),
    // }),
    LinksModule,
    ContentsModule,
    FilesModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "uploads"),
      serveRoot: "/uploads",
    }),
    CoursesModule,
    NewsModule,
    ProjectsModule,
    PublicationsModule,
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      load: [configuration],
    }),
    DepartmentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
