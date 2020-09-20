const { contactsModel } = require('./contacts.model');

exports.getContacts = async (req, res, next) => {
  try {
    const contacts = await contactsModel.listContacts();
    const parsedContacts = JSON.parse(contacts);

    res.status(200).json(parsedContacts);
  } catch (error) {
    next({ message: error });
  }
};

exports.getContact = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const contact = await contactsModel.findContactById(contactId);
    if (!contact) {
      res.status(404).json({ message: 'Contact not found' });
      return;
    }

    res.status(200).json(contact);
  } catch (error) {
    next({ message: error });
  }
};

exports.addContact = async (req, res, next) => {
  try {
    const newContact = await contactsModel.addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next({ message: error });
  }
};

exports.removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const contact = await contactsModel.findContactById(contactId);
    if (!contact) {
      res.status(404).json({ message: 'Contact not found' });
      return;
    }

    contactsModel.removeContact(contactId);

    res.status(200).json({ message: 'Contact deleted' });
  } catch (error) {
    next({ message: error });
  }
};

exports.updateContact = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const contact = await contactsModel.findContactById(contactId);
    if (!contact) {
      res.status(404).json({ message: 'Contact not found' });
      return;
    }

    const updatedContact = await contactsModel.updateContact(
      contactId,
      req.body
    );

    res.status(200).json(updatedContact);
  } catch (error) {
    next({ message: error });
  }
};
