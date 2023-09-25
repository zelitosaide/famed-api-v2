import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type PublicationDocument = HydratedDocument<Publication>;

@Schema({ timestamps: true })
export class Publication {
  @Prop({ required: true })
  title: string;

  @Prop()
  pmid: string;

  @Prop()
  department: string;

  @Prop([String])
  authors: String[];

  @Prop()
  review: string;

  @Prop()
  url: string;

  @Prop({ default: Date.now() })
  publicationDate: Date;
}

export const PublicationSchema = SchemaFactory.createForClass(Publication);
