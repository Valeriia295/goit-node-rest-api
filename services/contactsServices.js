import { promises as fs } from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const contactsPath = path.join("db", "contacts.json");

async function listContacts() {
  try {
    const readJsonFile = await fs.readFile(contactsPath);
    const contactsArray = JSON.parse(readJsonFile);

    return contactsArray;
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((contact) => contact.id === contactId);

    if (contact) {
      return contact;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((contact) => contact.id === contactId);

    if (!contact) {
      return null;
    }

    const filteredContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );
    await fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
    return contact;
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: uuidv4(),
      name,
      email,
      phone,
    };

    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));

    return newContact;
  } catch (error) {
    console.log(error);
  }
}

async function contactUpdate(contactId, updatedData) {
  try {
    const contacts = await listContacts();
    let existingContact = false;
    const updatedContacts = contacts.map((contact) => {
      if (contact.id === contactId) {
        existingContact = true;
        return { ...contact, ...updatedData };
      }
      return contact;
    });

    if (!existingContact) {
      return null;
    }

    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
    return updatedContacts.find((contact) => contact.id === contactId);
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
};
