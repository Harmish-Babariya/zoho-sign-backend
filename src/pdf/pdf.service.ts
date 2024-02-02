import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Pdf } from './schemas/pdf.schema';
import { HttpService } from '@nestjs/axios';
import { getPdfById } from './dto/getById.dto';
import { pdfId } from './dto/updatePdf.dto';

@Injectable()
export class PdfService {
    constructor(
        @InjectModel(Pdf.name)
        private pdfModel: mongoose.Model<Pdf>,
        private httpService: HttpService
    ) {}

    async findAll(): Promise<Pdf[]> {
        const pdfs = await this.pdfModel.find();
        return pdfs;
    }

    async create(pdf: Pdf): Promise<Pdf> {
        const res = await this.pdfModel.create(pdf)
        return res
    }

    async findById(id: getPdfById): Promise<Pdf> {
        const pdf = await this.pdfModel.findById(id)

        if(!pdf) throw new NotFoundException("Pdf not found.")

        return pdf
    }

    async update(id: pdfId, pdf: Pdf): Promise<Pdf> {
        return await this.pdfModel.findByIdAndUpdate(id, pdf, {
            new: true,
            runValidators: true
        })
    }
}
