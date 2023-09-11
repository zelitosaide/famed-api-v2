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

  async findAll(): Promise<File[]> {
    return this.fileModel.find().exec();
  }

  async findOne(id: string): Promise<File> {
    return this.fileModel.findOne({ _id: id }).exec();
  }

  async findByCategory(category: string): Promise<File[]> {
    return this.fileModel.find({ category }).exec();
  }

  update(id: number, updateFileDto: UpdateFileDto) {
    return `This action updates a #${id} file`;
  }

  async remove(id: string) {
    return await this.fileModel.findByIdAndRemove({ _id: id }).exec();
  }
}
