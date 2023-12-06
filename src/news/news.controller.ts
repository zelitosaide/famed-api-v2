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
    return await this.newsService.create({
      title: createNewsDto.title,
      description: createNewsDto.description,
      image: image.path,
    });
  }

  @Get()
  async findAll(): Promise<News[]> {
    return this.newsService.findAll();
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
    // return this.newsService.update(+id, updateNewsDto);
    // if (image.path.includes("undefined")) {
    //   return updateNewsDto;
    // } else {
    //   return { ...updateNewsDto, image: image.path };
    // }
    return image.path.includes("undefined");
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.newsService.remove(id);
  }
}
