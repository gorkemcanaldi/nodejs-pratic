import joi from 'joi';

const registerUserSchema = joi.object({
  name: joi.string().min(3).max(30).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).max(30).required(),
});

const loginUserSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).max(30).required(),
});

export { registerUserSchema, loginUserSchema };
