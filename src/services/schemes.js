const {
  Types: { ObjectId },
} = require('mongoose');
const Joi = require('joi');

exports.addContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  password: Joi.string().required(),
});

exports.updateContactSchema = Joi.object({
  name: Joi.string(),
  phone: Joi.string(),
  password: Joi.string(),
}).min(1);

exports.contactIdSchema = Joi.object({
  contactId: Joi.string()
    .custom((value, helpers) => {
      const isValidObjectId = ObjectId.isValid(value);
      if (!isValidObjectId) {
        return helpers.error('Invalid user id. Must be object id');
      }

      return value;
    })
    .required(),
});
