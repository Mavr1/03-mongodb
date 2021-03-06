const { ContactModel } = require('./contacts.model');
const promiseHandler = require('../helpers/helpers');

exports.getContacts = async (req, res, next) => {
  const [error, contacts] = await promiseHandler(ContactModel.find());

  if (error) {
    next(error);
  }

  res.status(200).json(contacts);
};

exports.getContact = async (req, res, next) => {
  const { contactId } = req.params;

  const [error, contact] = await promiseHandler(
    ContactModel.findById(contactId)
  );

  if (!contact) {
    res.status(404).json({ message: 'Contact not found' });
    return;
  }

  if (error) {
    next(error);
  }

  res.status(200).json(contact);
};

exports.addContact = async (req, res, next) => {
  const [errorUser, existingUser] = await promiseHandler(
    ContactModel.findOne({ email: req.body.email })
  );

  if (existingUser) {
    return res.status(409).send('User with such email already exists');
  }

  const [errorNewContact, newContact] = await promiseHandler(
    ContactModel.create(req.body)
  );

  if (errorUser || errorNewContact) {
    next(errorUser || errorNewContact);
  }

  res.status(201).json(newContact);
};

exports.removeContact = async (req, res, next) => {
  const { contactId } = req.params;

  const [error, contact] = await promiseHandler(
    ContactModel.findByIdAndDelete(contactId)
  );
  if (!contact) {
    res.status(404).json({ message: 'Contact not found' });
    return;
  }

  if (error) {
    next(error);
  }

  res.status(200).json({ message: 'Contact deleted' });
};

exports.updateContact = async (req, res, next) => {
  const { contactId } = req.params;

  const [error, updatedContact] = await promiseHandler(
    ContactModel.findByIdAndUpdate(contactId, req.body, {
      new: true,
    })
  );

  if (!updatedContact) {
    res.status(404).json({ message: 'Contact not found' });
    return;
  }

  if (error) {
    next(error);
  }

  res.status(200).json(updatedContact);
};
