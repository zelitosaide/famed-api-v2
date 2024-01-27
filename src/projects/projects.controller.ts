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
          // if (file.originalname === "undefined") { }
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
    if (thumbnail.path.includes("undefined")) {
      return await this.projectsService.create({
        ...createProjectDto,
        thumbnail: "undefined",
      });
    }

    return await this.projectsService.create({
      ...createProjectDto,
      thumbnail: thumbnail.path,
    });
  }

  @Get()
  async findAll(@Query() query): Promise<Project[]> {
    if (query.limit === "undefined") {
      return this.projectsService.findAll(query.query, query.page);
    }
    return this.projectsService.findAll(query.query, query.page, query.limit);
  }

  @Get("project-pages")
  async projectsPages(@Query() query) {
    return this.projectsService.projectsPages(query.query);
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Project> {
    return this.projectsService.findOne(id);
  }

  @Patch(":id")
  @UseInterceptors(
    FileInterceptor("thumbnail", {
      storage: diskStorage({
        destination: "uploads/projects/thumbnails/abc",
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
    @Body() updateProjectDto: UpdateProjectDto,
    @UploadedFile() thumbnail: Express.Multer.File,
  ) {
    if (thumbnail.path.includes("undefined")) {
      return this.projectsService.update(id, updateProjectDto);
    } else {
      return this.projectsService.update(id, {
        ...updateProjectDto,
        thumbnail: thumbnail.path,
      });
    }
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.projectsService.remove(id);
  }
}
