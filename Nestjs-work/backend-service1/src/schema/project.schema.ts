import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Project {
    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop()
    imageUrl: string;

    @Prop()
    contractTypeId: number;

    @Prop()
    contractSignedOn: Date;

    @Prop()
    budget: number;

    @Prop()
    isActive: boolean;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);