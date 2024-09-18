import Contact from "../models/contact.js";

async function getContacts(req, res, next) {
  try {
    const contacts = await Contact.find({ owner: req.user.id });
    res.send(contacts);
  } catch (error) {
    next(error);
  }
}

async function getContactById(req, res, next) {
  const { id } = req.params;

  //   console.log("id", id);
  try {
    const contact = await Contact.findOne({ _id: id, owner: req.user.id });
    // console.log("contact", contact);

    !contact
      ? res.status(404).send("Contact not found")
      : res.send(`getContactById ${contact}`);
  } catch (error) {
    next(error);
  }
}

async function createContact(req, res, next) {
  // console.log(req);
  const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    dateOfBirth: req.body.dateOfBirth,
    favorite: req.body.favorite,
    owner: req.user.id,
  };
  try {
    const result = await Contact.create(contact);
    res.status(201).send(result);
  } catch (error) {
    next(error);
  }
}

async function updateContactById(req, res, next) {
  const { id } = req.params;
  // console.log("id", id);
  const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    dateOfBirth: req.body.dateOfBirth,
    favorite: req.body.favorite,
  };
  const updateContact = await Contact.findByIdAndUpdate(id, contact, {
    new: true,
  });
  // console.log("updateContact", updateContact);
  try {
    !updateContact
      ? res.status(404).send("Contact not found")
      : res.send(`updateContactById ${updateContact}`);
  } catch (error) {}
}

async function delContactById(req, res, next) {
  const { id } = req.params;
  try {
    const deletedContact = await Contact.findByIdAndDelete(id);

    !deletedContact
      ? res.status(404).send("Contact not found")
      : res.send(`delContactById ${deletedContact}`);
  } catch (error) {
    next(error);
  }
}

export default {
  getContacts,
  getContactById,
  createContact,
  updateContactById,
  delContactById,
};
