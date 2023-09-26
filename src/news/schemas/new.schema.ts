import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type NewsDocument = HydratedDocument<News>;

@Schema({ timestamps: true })
export class News {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: "Start typing here..." })
  content: string;

  @Prop({ default: "Dep. Ciências Fisiológicas" })
  department: string;

  @Prop({ required: true })
  image: string;
}

export const NewsSchema = SchemaFactory.createForClass(News);
