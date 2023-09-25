export class CreatePublicationDto {
  title: string;
  pmid: string;
  department: string;
  authors: String[];
  review: string;
  url: string;
  publicationDate: Date;
}
