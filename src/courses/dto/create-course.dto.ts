import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateCourseDto {
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly description: string;

  @IsNotEmpty()
  readonly duration: string;

  @IsNotEmpty()
  readonly playlistId: string;

  @IsNotEmpty()
  readonly youtubeApiKey: string;

  @IsOptional()
  readonly content: string;
}
