import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

import { MongooseModule } from "@nestjs/mongoose";
import { LinksModule } from "./links/links.module";
import { ContentsModule } from "./contents/contents.module";
import { FilesModule } from "./files/files.module";

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost/fameddbv2"),
    LinksModule,
    ContentsModule,
    FilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
