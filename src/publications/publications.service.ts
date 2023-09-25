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

  async create(
    createPublicationDto: CreatePublicationDto,
  ): Promise<Publication> {
    return await this.publicationModel.create(createPublicationDto);
  }

  async findAll(): Promise<Publication[]> {
    return this.publicationModel.find().exec();
  }

  async findOne(id: string): Promise<Publication> {
    return this.publicationModel.findOne({ _id: id }).exec();
  }

  update(id: number, updatePublicationDto: UpdatePublicationDto) {
    return `This action updates a #${id} publication`;
  }

  async remove(id: string) {
    return await this.publicationModel.findByIdAndRemove({ _id: id }).exec();
  }
}
