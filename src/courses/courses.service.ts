import { Injectable } from "@nestjs/common";
import { CreateCourseDto } from "./dto/create-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Course } from "./schemas/course.schema";
import { Model } from "mongoose";

@Injectable()
export class CoursesService {
  constructor(@InjectModel(Course.name) private courseModel: Model<Course>) {}

  private readonly ITEMS_PER_PAGE = 7;

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    return await this.courseModel.create(createCourseDto);
  }

  async findAll(query: string, page: number): Promise<Course[]> {
    const skip = (page - 1) * this.ITEMS_PER_PAGE;

    if (query) {
      return this.courseModel
        .find({ $text: { $search: query } })
        .skip(skip)
        .limit(this.ITEMS_PER_PAGE)
        .sort({ createdAt: -1 })
        .allowDiskUse(true)
        .exec();
    }
    return this.courseModel
      .find()
      .skip(skip)
      .limit(this.ITEMS_PER_PAGE)
      .sort({ createdAt: -1 })
      .allowDiskUse(true)
      .exec();
  }

  async findOne(id: string): Promise<Course> {
    return this.courseModel.findOne({ _id: id }).exec();
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    return await this.courseModel
      .findByIdAndUpdate({ _id: id }, updateCourseDto, { new: true })
      .exec();
  }

  async remove(id: string) {
    return await this.courseModel.findByIdAndRemove({ _id: id }).exec();
  }

  async coursesPages(query: string) {
    let totalPages: number;
    if (query) {
      totalPages = await this.courseModel
        .countDocuments({ $text: { $search: query } })
        .exec();
    } else {
      totalPages = await this.courseModel.countDocuments({}).exec();
    }
    return Math.ceil(totalPages / this.ITEMS_PER_PAGE);
  }
}
