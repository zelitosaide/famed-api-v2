export class CreateProjectDto {
  title: string;
  description: string;
  regNumBioethic: string;
  department: string;
  approvalDate: Date;
  content: string;
  thumbnail: string;
  team: Object[];
  financiers: Object[];
  projectStartDate: Date;
  projectEndDate: Date;
}
