const Joi = require('joi');

const newAdvertSchema = Joi.object({
  marca: Joi.string().max(45).required(),
  modelo: Joi.string().max(45).required(),
  versao: Joi.string().max(45).required(),
  ano: Joi.number().integer().required(),
  quilometragem: Joi.number().integer().required(),
  observacao: Joi.string().required()
});

const validateBody = (req, _res, next) => {
  const isValid = newAdvertSchema.validate(req.body);

  if (isValid.error) return next(isValid.error);
  next();
};

module.exports = {
  validateBody,
};
