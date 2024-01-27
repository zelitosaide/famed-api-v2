import { IsNotEmpty } from "class-validator";

export class CreateNewsDto {
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly description: string;

  @IsNotEmpty()
  readonly content: string;

  @IsNotEmpty()
  readonly department: string;

  readonly image: string;
}
