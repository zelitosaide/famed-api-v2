import { IsNotEmpty } from "class-validator";

export class CreatePublicationDto {
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly pmid: string;

  @IsNotEmpty()
  readonly department: string;

  authors: String[];

  @IsNotEmpty()
  readonly review: string;

  @IsNotEmpty()
  readonly url: string;

  @IsNotEmpty()
  readonly publicationDate: Date;
}
