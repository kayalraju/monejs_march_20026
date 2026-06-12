
const Joi = require('joi');

const EmployeeSchemaValidation = Joi.object({
    name: Joi.string()
        .min(3)
        .max(50)
        .required(),

    email: Joi.string()
        .email()
        .required(),

    phone: Joi.string()
        .min(10)
        .required(),

    age: Joi.number()
        .integer()
        .min(18)
        .optional()
});

module.exports = EmployeeSchemaValidation