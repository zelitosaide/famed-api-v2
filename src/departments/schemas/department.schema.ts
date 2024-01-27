import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type DepartmentDocument = HydratedDocument<Department>;

@Schema({ timestamps: true })
export class Department {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: "Start typing here..." })
  content: string;

  @Prop({ required: false })
  thumbnail: string;
}

export const DepartmentSchema = SchemaFactory.createForClass(Department);
