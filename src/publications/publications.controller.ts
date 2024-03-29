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
import { PublicationsService } from "./publications.service";
import { CreatePublicationDto } from "./dto/create-publication.dto";
import { UpdatePublicationDto } from "./dto/update-publication.dto";
import { Publication } from "./schemas/publication.schema";

@Controller("publications")
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationsService) {}

  @Post()
  async create(@Body() createPublicationDto: CreatePublicationDto) {
    return await this.publicationsService.create(createPublicationDto);
  }

  @Get()
  async findAll(@Query() query): Promise<Publication[]> {
    if (query.limit === "undefined") {
      return this.publicationsService.findAll(query.query, query.page);
    }
    return this.publicationsService.findAll(
      query.query,
      query.page,
      query.limit,
    );
  }

  @Get("publication-pages")
  async publicationsPages(@Query() query) {
    return this.publicationsService.publicationsPages(query.query);
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Publication> {
    return this.publicationsService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updatePublicationDto: UpdatePublicationDto,
  ) {
    return this.publicationsService.update(id, updatePublicationDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.publicationsService.remove(id);
  }
}
