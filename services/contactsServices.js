import { Contact } from "../models/contact.js";

async function listContacts(userId) {
  try {
    const contacts = await Contact.find({ owner: userId });
    return contacts;
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId, userId) {
  try {
    const contact = await Contact.findOne({ _id: contactId, owner: userId });
    return contact;
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId, userId) {
  try {
    const contact = await Contact.findOneAndDelete({
      _id: contactId,
      owner: userId,
    });
    return contact;
  } catch (error) {
    console.log(error);
  }
}

async function addContact(userId, name, email, phone) {
  try {
    const newContact = new Contact({ owner: userId, name, email, phone });
    await newContact.save();
    return newContact;
  } catch (error) {
    console.log(error);
  }
}

async function contactUpdate(contactId, userId, updatedData) {
  try {
    const updatedContact = await Contact.findOneAndUpdate(
      { _id: contactId, owner: userId },
      { $set: updatedData },
      { new: true }
    );
    return updatedContact;
  } catch (error) {
    console.log(error);
  }
}

async function updateStatusContact(contactId, userId, favoriteStatus) {
  try {
    const updatedContact = await Contact.findOneAndUpdate(
      { _id: contactId, owner: userId },
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
