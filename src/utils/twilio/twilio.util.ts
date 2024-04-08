import { Twilio } from 'twilio';
import { constants } from '../../constants';
import { ErrorResponse } from 'src/errors';

const { twilioAccountSID, twilioAuthToken, twilioPhoneNumber } = constants;
const client = new Twilio(twilioAccountSID, twilioAuthToken);

export const sendSMS = async (phoneNumber: string, message: string) => {
  try {
    const smsResponse = await client.messages.create({
      from: twilioPhoneNumber,
      to: phoneNumber,
      body: message,
    });
    console.log('SMS Respones::',smsResponse.sid);
  } catch (error) {
    throw error;
  }
};
