import { IsNotEmpty, Length } from "class-validator";

export class getPdfById {
    @IsNotEmpty({message: "Id can't be empty."})
    @Length(24,24,{message: "id should be length of 24."})
    id: string
}