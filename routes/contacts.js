import express from "express";

import ContactController from "../controllers/contact.js";

const router = express.Router();
const jsonParser = express.json();

router.get("/", ContactController.getContacts);
router.get("/:id", ContactController.getContactById);
router.post("/", jsonParser, ContactController.createContact);
router.put("/:id", jsonParser, ContactController.updateContactById);
router.delete("/:id", ContactController.delContactById);

export default router;
