import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ContentDocument = HydratedDocument<Content>;

@Schema({ timestamps: true })
export class Content {
  @Prop({ required: true, unique: true })
  segment: string;

  @Prop()
  content: string;
}

export const ContentSchema = SchemaFactory.createForClass(Content);