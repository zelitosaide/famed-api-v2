import { Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type LinkDocument = HydratedDocument<Link>;

@Schema({ timestamps: true })
export class Link {}

export const LinkSchema = SchemaFactory.createForClass(Link);