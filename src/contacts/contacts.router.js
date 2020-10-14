const { Router } = require('express');

const { validate } = require('../helpers/validate');
const {
  contactIdSchema,
  addContactSchema,
  updateContactSchema,
} = require('../services/schemes');
const {
  getContacts,
  getContact,
  addContact,
  removeContact,
  updateContact,
} = require('./contacts.controller');

const router = Router();

router.get('/', getContacts);

router.get('/:contactId', validate(contactIdSchema, 'params'), getContact);

router.post('/', validate(addContactSchema), addContact);

router.delete(
  '/:contactId',
  validate(contactIdSchema, 'params'),
  removeContact
);

router.patch(
  '/:contactId',
  validate(contactIdSchema, 'params'),
  validate(updateContactSchema),
  updateContact
);

exports.contactsRouter = router;
