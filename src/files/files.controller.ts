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
import { FilesService } from "./files.service";
import { CreateFileDto } from "./dto/create-file.dto";
import { UpdateFileDto } from "./dto/update-file.dto";
import { File } from "./schemas/file.schema";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";

@Controller("files")
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "uploads",
        filename(req, file, callback) {
          const uniquePreffix =
            Date.now() + "-" + Math.round(Math.random() * 1e9);
          callback(null, uniquePreffix + "-" + file.originalname);
        },
      }),
    }),
  )
  async create(
    @Body() createFileDto: CreateFileDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.filesService.create({
      category: createFileDto?.category,
      type: createFileDto?.type,
      caption: createFileDto?.caption,
      url: file.path,
    });
  }

  @Get()
  async findAll(): Promise<File[]> {
    return this.filesService.findAll();
  }

  @Get("category/:category")
  async findByCategory(@Param("category") category: string): Promise<File[]> {
    return this.filesService.findByCategory(category);
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<File> {
    return this.filesService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateFileDto: UpdateFileDto) {
    return this.filesService.update(+id, updateFileDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.filesService.remove(id);
  }
}
