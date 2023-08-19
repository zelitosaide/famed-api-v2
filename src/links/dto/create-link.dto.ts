export class CreateLinkDto {
  title: string;
  category?: string;
  description?: string;
  segment?: string;
  href?: string;
  iconName?: string;
  children?: Object[];
}
