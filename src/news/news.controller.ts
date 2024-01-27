import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Query,
} from "@nestjs/common";
import { NewsService } from "./news.service";
import { CreateNewsDto } from "./dto/create-news.dto";
import { UpdateNewsDto } from "./dto/update-news.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { News } from "./schemas/new.schema";

@Controller("news")
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor("image", {
      storage: diskStorage({
        destination: "uploads/news/images",
        filename(req, file, callback) {
          // if (file.originalname === "undefined") { }
          const uniquePreffix =
            Date.now() + "-" + Math.round(Math.random() * 1e9);
          callback(null, uniquePreffix + "-" + file.originalname);
        },
      }),
    }),
  )
  async create(
    @Body() createNewsDto: CreateNewsDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    if (image.path.includes("undefined")) {
      return await this.newsService.create({
        title: createNewsDto.title,
        description: createNewsDto.description,
        department: createNewsDto.department,
        content: createNewsDto.content,
        image: "undefined",
      });
    }

    return await this.newsService.create({
      title: createNewsDto.title,
      description: createNewsDto.description,
      department: createNewsDto.department,
      content: createNewsDto.content,
      image: image.path,
    });
  }

  @Get()
  async findAll(@Query() query): Promise<News[]> {
    console.log(query);
    if (query.limit === "undefined") {
      return this.newsService.findAll(query.query, query.page);
    }
    return this.newsService.findAll(query.query, query.page, query.limit);
  }

  @Get("news-pages")
  async newsPages(@Query() query) {
    return this.newsService.newsPages(query.query);
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<News> {
    return this.newsService.findOne(id);
  }

  @Patch(":id")
  @UseInterceptors(
    FileInterceptor("image", {
      storage: diskStorage({
        destination: "uploads/news/images/abc",
        filename(req, file, callback) {
          const uniquePreffix =
            Date.now() + "-" + Math.round(Math.random() * 1e9);
          callback(null, uniquePreffix + "-" + file.originalname);
        },
      }),
    }),
  )
  update(
    @Param("id") id: string,
    @Body() updateNewsDto: UpdateNewsDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    if (image.path.includes("undefined")) {
      return this.newsService.update(id, updateNewsDto);
    } else {
      return this.newsService.update(id, {
        ...updateNewsDto,
        image: image.path,
      });
    }
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.newsService.remove(id);
  }
}
