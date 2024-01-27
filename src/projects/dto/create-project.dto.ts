import { IsNotEmpty } from "class-validator";

export class CreateProjectDto {
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly description: string;

  @IsNotEmpty()
  readonly regNumBioethic: string;

  @IsNotEmpty()
  readonly department: string;

  @IsNotEmpty()
  readonly approvalDate: Date;

  @IsNotEmpty()
  readonly content: string;

  @IsNotEmpty()
  readonly projectStartDate: Date;

  @IsNotEmpty()
  readonly projectEndDate: Date;

  readonly thumbnail: string;
  readonly team?: Object[];
  readonly financiers?: Object[];
}
