const express = require("express");

const ctrl = require("../../controllers/routerController");
const validateBody = require("../../middlewares/validateBody");
const addShema = require("../../schemas/joiSchema");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", validateBody(addShema), ctrl.postNewContact);

router.delete("/:contactId", ctrl.deleteById);

router.put("/:contactId", validateBody(addShema), ctrl.editContactById);

module.exports = router;
