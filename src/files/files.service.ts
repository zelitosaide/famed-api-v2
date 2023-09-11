import { Injectable } from "@nestjs/common";
import { CreateFileDto } from "./dto/create-file.dto";
import { UpdateFileDto } from "./dto/update-file.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { File } from "./schemas/file.schema";

@Injectable()
export class FilesService {
  constructor(@InjectModel(File.name) private fileModel: Model<File>) {}

  async create(createFileDto: CreateFileDto): Promise<File> {
    return await this.fileModel.create(createFileDto);
  }

  async findAll(): Promise<Link[]> {
    return this.linkModel.find().exec();
  }

  async findOne(id: string): Promise<Link> {
    return this.linkModel.findOne({ _id: id }).exec();
  }

  async findByCategory(category: string): Promise<Link[]> {
    return this.linkModel.find({ category }).exec();
  }

  update(id: number, updateLinkDto: UpdateLinkDto) {
    return `This action updates a #${id} link`;
  }

  async remove(id: string) {
    return await this.linkModel.findByIdAndRemove({ _id: id }).exec();
  }

  // create(createFileDto: CreateFileDto) {
  //   return "This action adds a new file";
  // }

  // findAll() {
  //   return `This action returns all files`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} file`;
  // }

  // update(id: number, updateFileDto: UpdateFileDto) {
  //   return `This action updates a #${id} file`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} file`;
  // }
}
