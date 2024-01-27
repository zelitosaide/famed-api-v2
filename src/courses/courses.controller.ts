import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { CoursesService } from "./courses.service";
import { CreateCourseDto } from "./dto/create-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";
import { Course } from "./schemas/course.schema";

@Controller("courses")
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  async create(@Body() createCourseDto: CreateCourseDto) {
    return await this.coursesService.create(createCourseDto);
  }

  @Get()
  async findAll(@Query() query): Promise<Course[]> {
    if (query.limit === "undefined") {
      return this.coursesService.findAll(query.query, query.page);
    }
    return this.coursesService.findAll(query.query, query.page, query.limit);
  }

  @Get("course-pages")
  async coursesPages(@Query() query) {
    return this.coursesService.coursesPages(query.query);
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Course> {
    return this.coursesService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(id, updateCourseDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.coursesService.remove(id);
  }
}
