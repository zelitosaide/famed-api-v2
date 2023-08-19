export class CreateLinkDto {
  title: string;
  categoria?: string;
  description?: string;
  segment?: string;
  href?: string;
  iconName?: string;
  children?: Object[];
}
