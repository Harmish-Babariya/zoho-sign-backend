import { Body, Controller, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { Pdf } from './schemas/pdf.schema';
import { CreatePdf } from './dto/createPdf.dto';
import { getPdfById } from './dto/getById.dto';
import { UpdatePdf, pdfId } from './dto/updatePdf.dto';

@Controller('pdf')
export class PdfController {
    constructor(private PdfService: PdfService) {}

  @Get()
  async getAllPdf(): Promise<Pdf[]> {
    return this.PdfService.findAll();
  }

  @Post()
  async create(@Body() pdf: CreatePdf): Promise<Pdf> {
    return this.PdfService.create(pdf);
  }

  @Get(':id')
  @UsePipes(ValidationPipe)
  async getPdf(@Param('id') id: getPdfById): Promise<Pdf> {
    return this.PdfService.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: pdfId, @Body() pdf: UpdatePdf): Promise<Pdf> {
    return this.PdfService.update(id, pdf);
  }
}
