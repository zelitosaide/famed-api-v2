import { Link } from "../schemas/link.schema";

export class CreateLinkDto {
  title: string;
  description?: string;
  segment?: string;
  href?: string;
  iconName?: string;
  children?: Link[];
}
