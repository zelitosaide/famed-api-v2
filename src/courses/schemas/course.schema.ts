import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CourseDocument = HydratedDocument<Course>;

@Schema({ timestamps: true })
export class Course {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  duration: string;

  @Prop({ required: true })
  playlistId: string;

  @Prop({ required: true })
  youtubeApiKey: string;

  @Prop()
  content: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
