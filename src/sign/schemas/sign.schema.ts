import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

interface actionField{
    recipientName: string,
    recipientEmail: string,
    actionId: string
}

@Schema({
    timestamps: true
})
export class SignRequest {
    
    @Prop({ default: '' })
    requestName: string;

    @Prop({ default: '' })
    requestStatus: string;

    @Prop({ default: '' })
    documentId: string;

    @Prop({ default: '' })
    requestId: string;

    @Prop({ default: '' })
    requestTypeId: string;
    
    @Prop({ default: [] })
    action: Array<actionField>;

    @Prop({ default: '' })
    content: string
}

export const SignRequestSchema = SchemaFactory.createForClass(SignRequest)