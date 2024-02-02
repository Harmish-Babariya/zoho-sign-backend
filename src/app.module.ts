import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SignModule } from './sign/sign.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PdfService } from './pdf/pdf.service';
import { PdfController } from './pdf/pdf.controller';
import { PdfModule } from './pdf/pdf.module';
import { HttpModule } from '@nestjs/axios';
import { PdfSchema } from './pdf/schemas/pdf.schema';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from './interceptor/transform.interceptor';

@Module({
  imports: [
    SignModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.DB_URL),
    PdfModule,
    HttpModule, 
    MongooseModule.forFeature([{ name: "Pdf", schema: PdfSchema }])
  ],
  controllers: [AppController, PdfController],
  providers: [AppService, PdfService,{
    provide: APP_INTERCEPTOR,
    useClass: TransformInterceptor,
  }],
})
export class AppModule {}
