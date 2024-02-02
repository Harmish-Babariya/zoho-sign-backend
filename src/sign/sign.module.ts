import { Module } from '@nestjs/common';
import { SignController } from './sign.controller';
import { SignService } from './sign.service';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { SignRequestSchema } from './schemas/sign.schema';

@Module({
  imports: [HttpModule, MongooseModule.forFeature([{ name: "SignRequest", schema: SignRequestSchema }])],
  controllers: [SignController],
  providers: [SignService]
})
export class SignModule {}
