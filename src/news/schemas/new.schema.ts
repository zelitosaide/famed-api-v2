import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type NewDocument = HydratedDocument<New>;

@Schema({ timestamps: true })
export class New {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: "Start typing here..." })
  content: string;

  @Prop({ default: "Dep. Ciências Fisiológicas" })
  department: string;
}

export const NewSchema = SchemaFactory.createForClass(New);
