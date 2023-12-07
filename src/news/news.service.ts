import { Injectable } from "@nestjs/common";
import { CreateNewsDto } from "./dto/create-news.dto";
import { UpdateNewsDto } from "./dto/update-news.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { News } from "./schemas/new.schema";

@Injectable()
export class NewsService {
  constructor(@InjectModel(News.name) private newsModel: Model<News>) {}

  async create(createNewsDto: CreateNewsDto): Promise<News> {
    return await this.newsModel.create(createNewsDto);
  }

  async findAll(): Promise<News[]> {
    return this.newsModel.find().exec();
  }

  async findOne(id: string): Promise<News> {
    return this.newsModel.findOne({ _id: id }).exec();
  }

  update(id: string, updateNewsDto: UpdateNewsDto) {
    return updateNewsDto;
  }

  async remove(id: string) {
    return await this.newsModel.findByIdAndRemove({ _id: id }).exec();
  }
}
