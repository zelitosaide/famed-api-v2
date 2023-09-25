import { Injectable } from "@nestjs/common";
import { CreatePublicationDto } from "./dto/create-publication.dto";
import { UpdatePublicationDto } from "./dto/update-publication.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Publication } from "./schemas/publication.schema";
import { Model } from "mongoose";

@Injectable()
export class PublicationsService {
  constructor(
    @InjectModel(Publication.name) private publicationModel: Model<Publication>,
  ) {}

  create(createPublicationDto: CreatePublicationDto) {
    return "This action adds a new publication";
  }

  findAll() {
    return `This action returns all publications`;
  }

  findOne(id: number) {
    return `This action returns a #${id} publication`;
  }

  update(id: number, updatePublicationDto: UpdatePublicationDto) {
    return `This action updates a #${id} publication`;
  }

  remove(id: number) {
    return `This action removes a #${id} publication`;
  }
}
