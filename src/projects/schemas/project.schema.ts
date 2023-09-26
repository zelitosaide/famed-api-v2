import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ProjectDocument = HydratedDocument<Project>;

@Schema({ timestamps: true })
export class Project {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: Date.now() })
  regNumBioethic: string;

  @Prop({ default: "Dep. Ciências Fisiológicas" })
  department: string;

  @Prop({ default: Date.now() })
  approvalDate: Date;

  @Prop({ default: "Type title here..." })
  content: string;

  @Prop({ required: true })
  thumbnail: string;

  @Prop([Object])
  team: Object[];

  @Prop([Object])
  financiers: Object[];

  @Prop({ required: true })
  projectStartDate: Date;

  @Prop({ required: true })
  projectEndDate: Date;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
