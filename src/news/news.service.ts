import { Injectable } from "@nestjs/common";
import { CreateNewsDto } from "./dto/create-news.dto";
import { UpdateNewsDto } from "./dto/update-news.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { News } from "./schemas/new.schema";

@Injectable()
export class NewsService {
  constructor(@InjectModel(News.name) private newsModel: Model<News>) {}

  private readonly ITEMS_PER_PAGE = 7;

  async create(createNewsDto: CreateNewsDto): Promise<News> {
    return await this.newsModel.create(createNewsDto);
  }

  async findAll(query: string, page: number): Promise<News[]> {
    const skip = (page - 1) * this.ITEMS_PER_PAGE;

    if (query) {
      return this.newsModel
        .find({ $text: { $search: query } })
        .skip(skip)
        .limit(this.ITEMS_PER_PAGE)
        .sort({ createdAt: -1 })
        // .allowDiskUse(true)
        .exec();
    }
    return this.newsModel
      .find()
      .skip(skip)
      .limit(this.ITEMS_PER_PAGE)
      .sort({ createdAt: -1 })
      // .allowDiskUse(true)
      .exec();
  }

  async findOne(id: string): Promise<News> {
    return this.newsModel.findOne({ _id: id }).exec();
  }

  async update(id: string, updateNewsDto: UpdateNewsDto) {
    return await this.newsModel
      .findByIdAndUpdate({ _id: id }, updateNewsDto, { new: true })
      .exec();
  }

  async remove(id: string) {
    return await this.newsModel.findByIdAndRemove({ _id: id }).exec();
  }

  async newsPages(query: string) {
    let totalPages: number;
    if (query) {
      totalPages = await this.newsModel
        .countDocuments({ $text: { $search: query } })
        .exec();
    } else {
      totalPages = await this.newsModel.countDocuments({}).exec();
    }
    return Math.ceil(totalPages / this.ITEMS_PER_PAGE);
  }
}
