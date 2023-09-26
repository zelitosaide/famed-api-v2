import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ProjectDocument = HydratedDocument<Project>;

@Schema({ timestamps: true })
export class Project {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  regNumBioethic: string;

  @Prop()
  department: string;

  @Prop({ default: Date.now() })
  approvalDate: Date;

  @Prop()
  content: string;

  @Prop()
  thumbnail: string;

  @Prop([Object])
  team: Object[];

  @Prop([Object])
  financiers: Object[];

  @Prop()
  projectStartDate: Date;
  
  @Prop()
  projectEndDate: Date;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
