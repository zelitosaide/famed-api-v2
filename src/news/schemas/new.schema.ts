import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type NewDocument = HydratedDocument<New>;

@Schema({ timestamps: true })
export class New {
  @Prop({ required: true })
  title: string;

  @Prop()
  category: string;

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

export const NewSchema = SchemaFactory.createForClass(New);
