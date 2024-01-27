import { Injectable } from "@nestjs/common";
import { CreateDepartmentDto } from "./dto/create-department.dto";
import { UpdateDepartmentDto } from "./dto/update-department.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Department } from "./schemas/department.schema";
import { Model } from "mongoose";

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectModel(Department.name) private departmentModel: Model<Department>,
  ) {}

  private readonly ITEMS_PER_PAGE = 7;

  async create(createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    return await this.departmentModel.create(createDepartmentDto);
  }

  async findAll(query: string, page: number): Promise<Department[]> {
    const skip = (page - 1) * this.ITEMS_PER_PAGE;

    if (query) {
      return this.departmentModel
        .find({ $text: { $search: query } })
        .skip(skip)
        .limit(this.ITEMS_PER_PAGE)
        .sort({ createdAt: -1 })
        .allowDiskUse(true)
        .exec();
    }
    return this.departmentModel
      .find()
      .skip(skip)
      .limit(this.ITEMS_PER_PAGE)
      .sort({ createdAt: -1 })
      .allowDiskUse(true)
      .exec();
  }

  async findOne(id: string): Promise<Department> {
    return this.departmentModel.findOne({ _id: id }).exec();
  }

  async update(id: string, updateDepartmentDto: UpdateDepartmentDto) {
    return await this.departmentModel
      .findByIdAndUpdate({ _id: id }, updateDepartmentDto, { new: true })
      .exec();
  }

  async remove(id: string) {
    return await this.departmentModel.findByIdAndRemove({ _id: id }).exec();
  }

  async departmentsPages(query: string) {
    let totalPages: number;
    if (query) {
      totalPages = await this.departmentModel
        .countDocuments({ $text: { $search: query } })
        .exec();
    } else {
      totalPages = await this.departmentModel.countDocuments({}).exec();
    }
    return Math.ceil(totalPages / this.ITEMS_PER_PAGE);
  }
}
