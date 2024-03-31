import * as Joi from 'joi';

export const RegisterSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  passwordSalt: Joi.string().required(),
});
