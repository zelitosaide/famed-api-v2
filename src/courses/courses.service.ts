import { Injectable } from "@nestjs/common";
import { CreateCourseDto } from "./dto/create-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Course } from "./schemas/course.schema";
import { Model } from "mongoose";

@Injectable()
export class CoursesService {
  constructor(@InjectModel(Course.name) private courseModel: Model<Course>) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    return await this.courseModel.create(createCourseDto);
  }

  async findAll(): Promise<Course[]> {
    return this.courseModel.find().exec();
  }

  async findOne(id: string): Promise<Course> {
    return this.courseModel.findOne({ _id: id }).exec();
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  async remove(id: string) {
    return await this.courseModel.findByIdAndRemove({ _id: id }).exec();
  }
}
