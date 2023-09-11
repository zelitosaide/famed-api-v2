import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type FileDocument = HydratedDocument<File>;

@Schema({ timestamps: true })
export class File {
  @Prop({ required: true, unique: true })
  url: string;

  @Prop({ required: true })
  caption: string;
}

export const FileSchema = SchemaFactory.createForClass(File);