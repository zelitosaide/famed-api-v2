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

  private readonly ITEMS_PER_PAGE = 7;

  async create(
    createPublicationDto: CreatePublicationDto,
  ): Promise<Publication> {
    return await this.publicationModel.create(createPublicationDto);
  }

  async findAll(query: string, page: number): Promise<Publication[]> {
    const skip = (page - 1) * this.ITEMS_PER_PAGE;

    if (query) {
      return this.publicationModel
        .find({ $text: { $search: query } })
        .skip(skip)
        .limit(this.ITEMS_PER_PAGE)
        .sort({ createdAt: -1 })
        .allowDiskUse(true)
        .exec();
    }
    return this.publicationModel
      .find()
      .skip(skip)
      .limit(this.ITEMS_PER_PAGE)
      .sort({ createdAt: -1 })
      .allowDiskUse(true)
      .exec();
  }

  async findOne(id: string): Promise<Publication> {
    return this.publicationModel.findOne({ _id: id }).exec();
  }

  async update(id: string, updatePublicationDto: UpdatePublicationDto) {
    return await this.publicationModel
      .findByIdAndUpdate({ _id: id }, updatePublicationDto, { new: true })
      .exec();
  }

  async remove(id: string) {
    return await this.publicationModel.findByIdAndRemove({ _id: id }).exec();
  }

  async publicationsPages(query: string) {
    let totalPages: number;
    if (query) {
      totalPages = await this.publicationModel
        .countDocuments({ $text: { $search: query } })
        .exec();
    } else {
      totalPages = await this.publicationModel.countDocuments({}).exec();
    }
    return Math.ceil(totalPages / this.ITEMS_PER_PAGE);
  }
}
