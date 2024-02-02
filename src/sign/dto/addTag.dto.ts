import { IsEmail, IsNotEmpty, Length } from "class-validator"

export interface addTag {
    // documentId: string
    // requestTypeId: string
    recipientName: string
    recipientEmail: string
    requestId: string
}
export class addTagRequest {
    // @IsNotEmpty({ message: "documentId can't be empty."})
    // readonly documentId: string

    // @IsNotEmpty({ message: "requestTypeId can't be empty."})
    // readonly requestTypeId: string

    @IsNotEmpty({ message: "recipientName can't be empty."})
    readonly recipientName: string

    @IsNotEmpty({ message: "recipientEmail can't be empty."})
    @IsEmail()
    readonly recipientEmail: string

    @IsNotEmpty({ message: "requestId can't be empty."})
    @Length(24, 24)
    readonly requestId: string
}

export interface actionField{
    recipientName: string,
    recipientEmail: string,
    actionId: string
}

export interface reqData {
    requestName: string
    requestStatus: string
    documentId: string
    requestId: string
    requestTypeId: string
    action: Array<actionField>
    content: string
}