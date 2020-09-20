const mongoose = require('mongoose');
const { Schema } = mongoose;

const contactSchema = new Schema({
  contactName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const ContactModel = mongoose.model('Contacts', contactSchema);

exports.ContactModel = ContactModel;
