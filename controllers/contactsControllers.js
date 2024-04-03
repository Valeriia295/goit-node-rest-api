import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  contactUpdate,
} from "../services/contactsServices.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getOneContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await getContactById(id);

    if (!contact) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    } else {
      res.status(200).json(contact);
    }
  } catch (error) {
    const { status = 500, message = "Server error" } = error;
    res.status(status).json({ message });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const existingContact = await getContactById(id);

    if (!existingContact) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    } else {
      const contactDeletion = await removeContact(id);
      res.status(200).json(contactDeletion);
    }
  } catch (error) {
    const { status = 500, message = "Server error" } = error;
    res.status(status).json({ message });
  }
};

export const createContact = async (req, res) => {
  try {
    const { error, value } = createContactSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const newContact = await addContact(value.name, value.email, value.phone);

    res.status(201).json(newContact);
  } catch (error) {
    const { status = 500, message = "Server error" } = error;
    res.status(status).json({ message });
  }
};

export const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { error, value } = updateContactSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    if (Object.keys(value).length === 0) {
      return res
        .status(400)
        .json({ message: "Body must have at least one field" });
    }

    const existingContact = await getContactById(id);
    if (!existingContact) {
      return res.status(404).json({ message: "Not found" });
    }

    const updatedContact = await contactUpdate(id, value);
    if (!updatedContact) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    const { status = 500, message = "Server error" } = error;
    res.status(status).json({ message });
  }
};
