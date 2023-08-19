import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type LinkDocument = HydratedDocument<Link>;

@Schema({ timestamps: true })
export class Link {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  segment: string;

  @Prop()
  href: string;

  @Prop()
  iconName: string;

  @Prop([Object])
  children: Object[];
}

export const LinkSchema = SchemaFactory.createForClass(Link);
