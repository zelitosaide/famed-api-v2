import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateDepartmentDto {
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly description: string;

  @IsNotEmpty()
  readonly content: string;

  @IsOptional()
  readonly thumbnail: string;
}
