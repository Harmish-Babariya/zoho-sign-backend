import { IsNotEmpty } from "class-validator"

export interface submitToSign {
    requestId: string
}
export class submitReq {
    @IsNotEmpty({ message: "requestId can't be empty."})
    readonly requestId: string
}
