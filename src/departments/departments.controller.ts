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
import { DepartmentsService } from "./departments.service";
import { CreateDepartmentDto } from "./dto/create-department.dto";
import { UpdateDepartmentDto } from "./dto/update-department.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { Department } from "./schemas/department.schema";

@Controller("departments")
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor("thumbnail", {
      storage: diskStorage({
        destination: "uploads/departments/thumbnails",
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
    @Body() createDepartmentDto: CreateDepartmentDto,
    @UploadedFile() thumbnail: Express.Multer.File,
  ) {
    if (!thumbnail) {
      return await this.departmentsService.create({
        title: createDepartmentDto.title,
        description: createDepartmentDto.description,
        content: createDepartmentDto.content,
        thumbnail: "undefined",
      });
    }

    return await this.departmentsService.create({
      title: createDepartmentDto.title,
      description: createDepartmentDto.description,
      content: createDepartmentDto.content,
      thumbnail: thumbnail.path,
    });
  }

  @Get()
  async findAll(@Query() query): Promise<Department[]> {
    if (query.limit === "undefined") {
      return this.departmentsService.findAll(query.query, query.page);
    }
    return this.departmentsService.findAll(
      query.query,
      query.page,
      query.limit,
    );
  }

  @Get("department-pages")
  async departmentsPages(@Query() query) {
    return this.departmentsService.departmentsPages(query.query);
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Department> {
    return this.departmentsService.findOne(id);
  }

  @Patch(":id")
  @UseInterceptors(
    FileInterceptor("thumbnail", {
      storage: diskStorage({
        destination: "uploads/departments/thumbnails/abc",
        filename(req, file, callback) {
          // if (file.originalname === "undefined") { }
          const uniquePreffix =
            Date.now() + "-" + Math.round(Math.random() * 1e9);
          callback(null, uniquePreffix + "-" + file.originalname);
        },
      }),
    }),
  )
  update(
    @Param("id") id: string,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
    @UploadedFile() thumbnail: Express.Multer.File,
  ) {
    if (!thumbnail) {
      return this.departmentsService.update(id, updateDepartmentDto);
    } else {
      return this.departmentsService.update(id, {
        ...updateDepartmentDto,
        thumbnail: thumbnail.path,
      });
    }
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.departmentsService.remove(id);
  }
}
