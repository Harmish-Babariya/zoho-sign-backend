import { Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { SignService } from './sign.service';
import { createSignRequest } from './dto/createRequest.dto';
import { addTag, reqData } from './dto/addTag.dto';
import { submitReq, submitToSign } from './dto/submitToSign.dto';
import { response } from './dto/resposeObj.dto';

@Controller('sign')
export class SignController {
  constructor(private SignService: SignService) {}
  
  @Post('/request')
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  async createSignRequest(@Body() request: createSignRequest): Promise<response> {
    return this.SignService.createRequest(request);
  }

  @Post('/request/addtag')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  async addTag(@Body() request: addTag): Promise<response> {
    return this.SignService.addSignTag(request);
  }

  @Post('/request/submit')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  async submitToSign(@Body() request: submitReq): Promise<response> {
    return this.SignService.submitToSign(request);
  }
}
