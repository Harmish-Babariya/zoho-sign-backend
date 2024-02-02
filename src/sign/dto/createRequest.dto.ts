import { IsNotEmpty } from "class-validator"

export interface createRequest {
    requestName: string
    file: string
}
export class createSignRequest {
    @IsNotEmpty({ message: "file can't be empty."})
    readonly file: string

    @IsNotEmpty({ message: "requsetName can't be empty."})
    readonly requestName: string
}