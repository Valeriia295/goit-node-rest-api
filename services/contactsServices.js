import { Contact } from "../models/contact.js";

async function listContacts() {
  try {
    const contacts = await Contact.find();
    return contacts;
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const contact = await Contact.findById(contactId);
    return contact;
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const contact = await Contact.findByIdAndDelete(contactId);
    return contact;
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const newContact = new Contact({ name, email, phone });
    await newContact.save();
    return newContact;
  } catch (error) {
    console.log(error);
  }
}

async function contactUpdate(contactId, updatedData) {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      updatedData,
      { new: true }
    );
    return updatedContact;
  } catch (error) {
    console.log(error);
  }
}

async function updateStatusContact(contactId, favoriteStatus) {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { $set: { favorite: favoriteStatus } },
      { new: true }
    );
    return updatedContact;
  } catch (error) {
    console.log(error);
  }
}

export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  contactUpdate,
  updateStatusContact,
};
