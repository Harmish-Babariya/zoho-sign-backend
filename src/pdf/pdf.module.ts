import { Module } from '@nestjs/common';
import { PdfController } from './pdf.controller';
import { PdfService } from './pdf.service';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { PdfSchema } from './schemas/pdf.schema';

@Module({
    imports: [HttpModule, MongooseModule.forFeature([{ name: "Pdf", schema: PdfSchema }])],
    controllers: [PdfController],
    providers: [PdfService]
})
export class PdfModule {}