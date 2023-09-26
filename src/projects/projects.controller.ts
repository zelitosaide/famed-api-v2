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
import { ProjectsService } from "./projects.service";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { Project } from "./schemas/project.schema";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";

@Controller("projects")
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor("thumbnail", {
      storage: diskStorage({
        destination: "uploads/projects/thumbnails",
        filename(req, file, callback) {
          const uniquePreffix =
            Date.now() + "-" + Math.round(Math.random() * 1e9);
          callback(null, uniquePreffix + "-" + file.originalname);
        },
      }),
    }),
  )
  async create(
    @Body() createProjectDto: CreateProjectDto,
    @UploadedFile() thumbnail: Express.Multer.File,
  ) {
    return await this.projectsService.create({
      title: createProjectDto.title,
      description: createProjectDto.description,
      thumbnail: thumbnail.path,
    });
  }

  @Get()
  async findAll(): Promise<Project[]> {
    return this.projectsService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Project> {
    return this.projectsService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(+id, updateProjectDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.projectsService.remove(id);
  }
}
