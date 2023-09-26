import { Injectable } from "@nestjs/common";
import { CreateNewsDto } from "./dto/create-news.dto";
import { UpdateNewsDto } from "./dto/update-news.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { News } from "./schemas/new.schema";

@Injectable()
export class NewsService {
  constructor(@InjectModel(News.name) private newModel: Model<News>) {}

  async create(createNewsDto: CreateNewsDto): Promise<News> {
    return await this.newModel.create(createNewsDto);
  }

  findAll() {
    return `This action returns all news`;
  }

  findOne(id: number) {
    return `This action returns a #${id} news`;
  }

  update(id: number, updateNewsDto: UpdateNewsDto) {
    return `This action updates a #${id} news`;
  }

  remove(id: number) {
    return `This action removes a #${id} news`;
  }
}
