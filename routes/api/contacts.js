const express = require("express");

const ctrl = require("../../controllers/routerController");
const { validateById, validateBody } = require("../../middlewares");
const { shema } = require("../../models/contact");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", validateById, ctrl.getById);

router.post("/", validateBody(shema.addShema), ctrl.postNewContact);

router.delete("/:contactId", validateById, ctrl.deleteById);

router.put("/:contactId", validateById, validateBody(shema.addShema), ctrl.editContactById);

router.patch(
	"/:contactId/favorite",
	validateById,
	validateBody(shema.contactFavoriteShema),
	ctrl.updateStatusContact
);

module.exports = router;
