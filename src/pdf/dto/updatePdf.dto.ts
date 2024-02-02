import { IsNotEmpty, Length } from "class-validator"

export class UpdatePdf {
    @IsNotEmpty({ message: "title can't be empty."})
    readonly title: string

    @IsNotEmpty({ message: "content can't be empty."})
    readonly content: string
}

export class pdfId {
    @IsNotEmpty({message: "Id can't be empty."})
    @Length(24,24,{message: "id should be length of 24."})
    id: string
}