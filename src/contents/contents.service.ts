import { Injectable } from "@nestjs/common";
import { CreateContentDto } from "./dto/create-content.dto";
import { UpdateContentDto } from "./dto/update-content.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Content } from "./schemas/content.schema";

@Injectable()
export class ContentsService {
  constructor(
    @InjectModel(Content.name) private contentModel: Model<Content>,
  ) {}

  async create(createContentDto: CreateContentDto): Promise<Content> {
    return await this.contentModel.create(createContentDto);
  }

  async findAll(): Promise<Content[]> {
    return this.contentModel.find().exec();
  }

  async findOne(id: string): Promise<Content> {
    return this.contentModel.findOne({ _id: id }).exec();
  }

  async findBySegment(segment: string): Promise<Content> {
    return this.contentModel.findOne({ segment }).exec();
  }

  async update(id: string, updateContentDto: UpdateContentDto) {
    return await this.contentModel
      .findByIdAndUpdate({ _id: id }, updateContentDto, { new: true })
      .exec();
  }

  async remove(id: string) {
    return await this.contentModel.findByIdAndRemove({ _id: id }).exec();
  }
}
