import { IsNotEmpty } from "class-validator"

export class CreatePdf {
    @IsNotEmpty({ message: "title can't be empty."})
    readonly title: string

    @IsNotEmpty({ message: "content can't be empty."})
    readonly content: string
}