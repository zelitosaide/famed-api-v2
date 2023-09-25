import { Module } from "@nestjs/common";
import { PublicationsService } from "./publications.service";
import { PublicationsController } from "./publications.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Publication, PublicationSchema } from "./schemas/publication.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Publication.name, schema: PublicationSchema },
    ]),
  ],
  controllers: [PublicationsController],
  providers: [PublicationsService],
})
export class PublicationsModule {}
