import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ContentsService } from "./contents.service";
import { CreateContentDto } from "./dto/create-content.dto";
import { UpdateContentDto } from "./dto/update-content.dto";
import { Content } from "./schemas/content.schema";

@Controller("contents")
export class ContentsController {
  constructor(private readonly contentsService: ContentsService) {}

  @Post()
  async create(@Body() createContentDto: CreateContentDto) {
    return await this.contentsService.create(createContentDto);
  }

  @Get()
  async findAll(): Promise<Content[]> {
    return this.contentsService.findAll();
  }

  @Get("segment/:segment")
  async findBySegment(@Param("segment") segment: string): Promise<Content> {
    return this.contentsService.findBySegment(segment);
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Content> {
    return this.contentsService.findOne(id);
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateContentDto: UpdateContentDto,
  ) {
    return this.contentsService.update(id, updateContentDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.contentsService.remove(id);
  }
}
