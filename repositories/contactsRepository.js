import Contact from "../db/models/contact.js";

const listAllDbContacts = () => Contact.find();

const listContacts = (userId = null) => {
  if (userId) {
    // Якщо переданий userId, повертаємо контакти конкретного користувача
    return Contact.find({ userId });
  } else {
    // Якщо userId не переданий, повертаємо всі контакти
    return Contact.find();
  }
};
// Contact.find({ owner: userId });

const getContactById = (id, userId) =>
  Contact.findOne({ _id: id, owner: userId }).populate(
    "owner",
    "-password -token"
  );

const removeContact = (id, userId) =>
  Contact.findOneAndDelete({ _id: id, owner: userId });

const addContact = (name, email, phone, userId) =>
  Contact.create({ name, email, phone, owner: userId });

const updateContactById = (id, userId, data) =>
  Contact.findByIdAndUpdate({ _id: id, owner: userId }, data, { new: true });

const updateFavoriteContactById = (id, userId, status) =>
  Contact.findByIdAndUpdate(
    { _id: id, owner: userId },
    { favorite: status },
    { new: true }
  );

export default {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContactById,
  updateFavoriteContactById,
  listAllDbContacts,
};
