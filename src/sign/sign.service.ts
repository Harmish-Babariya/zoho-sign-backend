import { Injectable, Logger } from '@nestjs/common';
import { SignRequest } from './schemas/sign.schema';
import { createRequest } from './dto/createRequest.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { addTag, reqData } from './dto/addTag.dto';
import { submitToSign } from './dto/submitToSign.dto';
import { response } from './dto/resposeObj.dto';
const rp = require('request-promise');

@Injectable()
export class SignService {
    constructor(       
        @InjectModel(SignRequest.name)
        private signRequestModel: mongoose.Model<SignRequest>
    ) {}

    async createRequest(SignRequest: createRequest): Promise<response> {
        const options = {
            method: 'POST',
            uri: process.env.ZOHO_URL + '/requests',
            headers: {
                'Authorization': `Zoho-oauthtoken ${process.env.ZOHO_TOKEN}`
            },
            formData: {
                file: {
                    value: Buffer.from(SignRequest.file, 'base64'),
                    options: {
                      filename: SignRequest.requestName + '.pdf',
                    },
                  },
                  data: JSON.stringify({
                    requests: {
                      request_name: SignRequest.requestName,
                      is_sequential: false
                    }
                  }),
            },
            json: true,
        };
    
        try {
            const res = await rp(options);
            const requestData = {
                requestName: SignRequest.requestName,
                requestStatus: res.requests.request_status,
                documentId: res.requests.document_fields[0].document_id,
                requestId: res.requests.request_id,
                requestTypeId: res.requests.request_type_id,
                content: SignRequest.file
            }

            const request = await this.signRequestModel.create(requestData)
            return { message: "Document created to Zoho.", data: request };
        } catch (error) {
            Logger.error(error.message)
            throw error;
        }
    }

    async addSignTag(addTagRequest: addTag): Promise<response> {
        const reqData:reqData = await this.signRequestModel.findOne({ requestId: addTagRequest.requestId })

        const options = {
            method: 'PUT',
            uri: process.env.ZOHO_URL + '/requests/' + reqData.requestId,
            headers: {
                'Authorization': `Zoho-oauthtoken ${process.env.ZOHO_TOKEN}`
            },
            formData: {
                  data: JSON.stringify({
                    requests: {
                        document_ids: [
                          {
                            document_id: reqData.documentId,
                            document_order: 0
                          }
                        ],
                        request_type_id: reqData.requestTypeId,
                        request_name: reqData.requestName,
                        actions: [
                          {
                            recipient_name: addTagRequest.recipientName,
                            recipient_email: addTagRequest.recipientEmail,
                            ishost: false,
                            in_person_name: "",
                            in_person_email: "",
                            action_type: "SIGN",
                            private_notes: "",
                            language: "en",
                            delivery_mode: "EMAIL",
                            verify_recipient: false
                          }
                        ],
                        notes: "",
                        expiration_days: 15,
                        is_sequential: false,
                        email_reminders: true,
                        reminder_period: 5,
                        validity: -1,
                        deleted_actions: [],
                        bulk_actions: [],
                        is_bulk: false
                      }
                  }),
            },
            json: true,
        };
    
        try {
            const res = await rp(options);
            const requestData = {
              action: [{
                recipientName: addTagRequest.recipientName,
                recipientEmail: addTagRequest.recipientEmail,
                actionId: res.requests.actions[0].action_id
              }]
            }

            const updatedReq = await this.signRequestModel.findOneAndUpdate({ requestId: addTagRequest.requestId}, requestData, { new: true } )
            return { message: "Sign tag added to document.", data: updatedReq }
        } catch (error) {
            Logger.error(error.message)
            throw error;
        }
    }

    async submitToSign(submitReq: submitToSign): Promise<response> {
      const reqData:reqData = await this.signRequestModel.findOne({ requestId: submitReq.requestId })

      const options = {
          method: 'POST',
          uri: process.env.ZOHO_URL + '/requests/' + submitReq.requestId + '/submit',
          headers: {
              'Authorization': `Zoho-oauthtoken ${process.env.ZOHO_TOKEN}`
          },
          formData: {
                data: JSON.stringify({
                  requests: {
                    actions: [
                      {
                        action_id: reqData.action[0].actionId,
                        fields: [
                          {
                            field_type_id: "55847000000000177",
                            field_type_name: "Signature",
                            action_id: reqData.action[0].actionId,
                            document_id: reqData.documentId,
                            field_name: "Signature",
                            width: "22.732769",
                            height: "2.307692",
                            is_mandatory: true,
                            x_value: "73.035067",
                            y_value: "95.897436",
                            page_no: 0,
                            field_category: "image",
                            is_resizable: true,
                            is_draggable: false,
                            field_label: "Signature"
                          }
                        ],
                        verify_recipient: false,
                        recipient_countrycode_iso: "",
                        action_type: "SIGN",
                        private_notes: "",
                        cloud_provider_name: "Zoho Sign",
                        recipient_email: reqData.action[0].recipientEmail,
                        send_completed_document: true,
                        recipient_phonenumber: "",
                        is_bulk: false,
                        cloud_provider_id: 10,
                        signing_order: 1,
                        recipient_name: reqData.action[0].recipientName,
                        delivery_mode: "EMAIL",
                        recipient_countrycode: "",
                        deleted_fields: []
                      }
                    ],
                    deleted_actions: [],
                    document_fields: []
                  }
                }),
          },
          json: true,
      };
  
      try {
          const res = await rp(options);
          const requestData = {
            requestStatus: res.requests.request_status
          }
          const updatedReq = await this.signRequestModel.findOneAndUpdate({ requestId: submitReq.requestId}, requestData, { new: true } )
          return { message: "Sign request submitted to recipient.", data: updatedReq }
      } catch (error) {
          Logger.error(error.message)
          throw error;
      }
  }
}