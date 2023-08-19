import { Injectable } from "@nestjs/common";
import { CreateLinkDto } from "./dto/create-link.dto";
import { UpdateLinkDto } from "./dto/update-link.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Link } from "./schemas/link.schema";
import { Model } from "mongoose";

@Injectable()
export class LinksService {
  constructor(@InjectModel(Link.name) private linkModel: Model<Link>) {}

  async create(createLinkDto: CreateLinkDto): Promise<Link> {
    return await this.linkModel.create(createLinkDto);
  }

  async findAll(): Promise<Link[]> {
    return this.linkModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} link`;
  }

  update(id: number, updateLinkDto: UpdateLinkDto) {
    return `This action updates a #${id} link`;
  }

  async remove(id: string) {
    return await this.linkModel.findByIdAndRemove({ _id: id }).exec();
  }
}
