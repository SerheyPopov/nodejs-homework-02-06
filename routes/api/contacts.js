const express = require("express");

const ctrl = require("../../controllers");
const { validateById, validateBody, authenticate } = require("../../middlewares");
const { shema } = require("../../models");

const router = express.Router();

router.get("/", authenticate, ctrl.getAll);

router.get("/:contactId", authenticate, validateById, ctrl.getById);

router.post("/", authenticate, validateBody(shema.addShema), ctrl.postNewContact);

router.delete("/:contactId", authenticate, validateById, ctrl.deleteById);

router.put(
	"/:contactId",
	authenticate,
	validateById,
	validateBody(shema.addShema),
	ctrl.editContactById
);

router.patch(
	"/:contactId/favorite",
	authenticate,
	validateById,
	validateBody(shema.contactFavoriteShema),
	ctrl.updateStatusContact
);

module.exports = router;
