const Joi = require('@hapi/joi');

module.exports = {
  location: Joi.object().keys({
    location: Joi.string().required(),
    maleResidents: Joi.number().positive().greater(1).required(),
    femaleResidents: Joi.number().positive().greater(1).required()
})
};