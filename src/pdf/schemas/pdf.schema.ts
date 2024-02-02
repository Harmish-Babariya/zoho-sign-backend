import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true
})
export class Pdf {
    
    @Prop()
    title: String;

    @Prop()
    content: String;
}

export const PdfSchema = SchemaFactory.createForClass(Pdf)