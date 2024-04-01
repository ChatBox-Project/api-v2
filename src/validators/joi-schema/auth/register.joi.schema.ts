import * as Joi from 'joi';

export const RegisterSchema = Joi.object({
  phoneNumber: Joi.string().required(),
  password: Joi.string().required(),
});
