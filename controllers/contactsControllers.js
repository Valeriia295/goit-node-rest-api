import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  contactUpdate,
  updateStatusContact,
} from "../services/contactsServices.js";
import {
  createContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
} from "../schemas/contactsSchemas.js";

export const getAllContacts = async (req, res) => {
  try {
    const userId = req.user._id;
    const contacts = await listContacts(userId);
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getOneContact = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const contact = await getContactById(id, userId);

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
    const userId = req.user._id;
    const existingContact = await getContactById(id, userId);

    if (!existingContact) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    } else {
      const contactDeletion = await removeContact(id, userId);
      res.status(200).json(contactDeletion);
    }
  } catch (error) {
    const { status = 500, message = "Server error" } = error;
    res.status(status).json({ message });
  }
};

export const createContact = async (req, res) => {
  try {
    const userId = req.user._id;
    const { error, value } = createContactSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const newContact = await addContact(
      userId,
      value.name,
      value.email,
      value.phone
    );

    res.status(201).json(newContact);
  } catch (error) {
    const { status = 500, message = "Server error" } = error;
    res.status(status).json({ message });
  }
};

export const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const { error, value } = updateContactSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    if (Object.keys(value).length === 0) {
      return res
        .status(400)
        .json({ message: "Body must have at least one field" });
    }

    const existingContact = await getContactById(id, userId);
    if (!existingContact) {
      return res.status(404).json({ message: "Not found" });
    }

    const updatedContact = await contactUpdate(id, userId, value);
    if (!updatedContact) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    const { status = 500, message = "Server error" } = error;
    res.status(status).json({ message });
  }
};

export const updateFavoriteStatus = async (req, res) => {
  try {
    const { contactId } = req.params;
    const userId = req.user._id;
    const { error, value } = updateFavoriteSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const updatedContact = await updateStatusContact(
      contactId,
      userId,
      value.favorite
    );
    if (!updatedContact) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    } else {
      res.status(200).json(updatedContact);
    }
  } catch (error) {
    const { status = 500, message = "Server error" } = error;
    res.status(status).json({ message });
  }
};
