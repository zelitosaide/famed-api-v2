import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

import { MongooseModule } from "@nestjs/mongoose";
import { LinksModule } from "./links/links.module";
import { ContentsModule } from "./contents/contents.module";

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost/fameddbv2"),
    LinksModule,
    ContentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
