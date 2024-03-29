import { BadRequestException } from '@nestjs/common';
import * as JWT from 'jsonwebtoken';
import { ErrorResponse } from 'src/errors';

interface ITokenPair {
  accessToken: string;
  refreshToken: string;
}

export const createTokenPair = async (payload: any, publicKey, privateKey): Promise<ITokenPair> => {
  try {
    const accessToken = await JWT.sign(payload, privateKey, {
      algorithm: 'RS256',
      expiresIn: '2 days',
    });
    const refreshToken = await JWT.sign(payload, privateKey, {
      algorithm: 'RS256',
      expiresIn: '7 days',
    });
    await Promise.all([JWT.verify(accessToken, publicKey), JWT.verify(refreshToken, publicKey)]);

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ErrorResponse({
      ...new BadRequestException(error.message),
      errorCode: `Error creating token pair: ${error}`,
    });
  }
};
