import joi from 'joi';

export const ogrenciEkleSchema = joi.object({
  name: joi.string().min(3).max(30).required(),
  age: joi.number().integer().min(6).max(16).required().messages({
    'number.min': "Yaş 6'dan küçük olamaz",
    'number.max': "Yaş 16'dan büyük olamaz",
    'number.integer': 'Yaş tam sayı olmak zorunda',
    'number.base': 'Yaş sayı olmak zorunda',
    'any.required': 'Yaş girmek zorundasın',
  }),
  gender: joi.string().valid('female', 'male', 'other').required().messages({
    'any.only': 'male, female veya other girmek zorundasın',
  }),
  avgMark: joi.number().min(2).max(12).required(),
  onDuty: joi.boolean().required(),
  parentId: joi.string().required(),
});

export const ogrenciGuncelleSchema = joi.object({
  name: joi.string().min(3).max(30),
  age: joi.number().integer().min(6).max(16).messages({
    'number.min': "Yaş 6'dan küçük olamaz",
    'number.max': "Yaş 16'dan büyük olamaz",
    'number.integer': 'Yaş tam sayı olmak zorunda',
    'number.base': 'Yaş sayı olmak zorunda',
    'any.required': 'Yaş girmek zorundasın',
  }),
  gender: joi.string().valid('female', 'male', 'other').messages({
    'any.only': 'male, female veya other girmek zorundasın',
  }),
  avgMark: joi.number().min(2).max(12),
  onDuty: joi.boolean(),
});
