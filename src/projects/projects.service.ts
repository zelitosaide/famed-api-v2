import { Injectable } from "@nestjs/common";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Project } from "./schemas/project.schema";

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
  ) {}

  private readonly ITEMS_PER_PAGE = 7;

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    return await this.projectModel.create(createProjectDto);
  }

  async findAll(query: string, page: number): Promise<Project[]> {
    const skip = (page - 1) * this.ITEMS_PER_PAGE;

    if (query) {
      return this.projectModel
        .find({ $text: { $search: query } })
        .skip(skip)
        .limit(this.ITEMS_PER_PAGE)
        .sort({ createdAt: -1 })
        // .allowDiskUse(true)
        .exec();
    }
    return this.projectModel
      .find()
      .skip(skip)
      .limit(this.ITEMS_PER_PAGE)
      .sort({ createdAt: -1 })
      // .allowDiskUse(true)
      .exec();
  }

  async findOne(id: string): Promise<Project> {
    return this.projectModel.findOne({ _id: id }).exec();
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    return await this.projectModel
      .findByIdAndUpdate({ _id: id }, updateProjectDto, { new: true })
      .exec();
  }

  async remove(id: string) {
    return await this.projectModel.findByIdAndRemove({ _id: id }).exec();
  }

  async projectsPages(query: string) {
    let totalPages: number;
    if (query) {
      totalPages = await this.projectModel
        .countDocuments({ $text: { $search: query } })
        .exec();
    } else {
      totalPages = await this.projectModel.countDocuments({}).exec();
    }
    return Math.ceil(totalPages / this.ITEMS_PER_PAGE);
  }
}
