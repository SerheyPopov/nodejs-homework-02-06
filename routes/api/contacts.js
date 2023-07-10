const express = require("express");
const Joi = require("joi");

const HttpError = require("../../helpers/HttpErrors");
const listContacts = require("../../models/contacts");

const router = express.Router();

const addShema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().required(),
	phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
	try {
		const contacts = await listContacts.listContacts();
		res.json({
			status: "success",
			code: "200",
			body: {
				result: contacts,
			},
		});
	} catch (error) {
		next(error);
	}
});

router.get("/:contactId", async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const contactById = await listContacts.getContactById(contactId);
		console.log(contactById);
		if (!contactById) {
			throw HttpError(404, "not found");
		}
		res.json({
			status: "success",
			code: "200",
			body: {
				result: contactById,
			},
		});
	} catch (error) {
		next(error);
	}
});

router.post("/", async (req, res, next) => {
	try {
		const { error } = addShema.validate(req.body);
		if (error) {
			throw HttpError(400, "missing required name field");
		}
		const newContact = await listContacts.addContact(req.body);
		res.status(201).json({
			status: "created",
			code: "201",
			body: {
				result: newContact,
			},
		});
	} catch (error) {
		next(error);
	}
});

router.delete("/:contactId", async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const remove = await listContacts.removeContact(contactId);
		if (!remove) {
			throw HttpError(404, "not found");
		}
		res.json({
			status: "deleted",
			code: "200",
			body: {
				result: remove,
			},
		});
	} catch (error) {
		next(error);
	}
});

router.put("/:contactId", async (req, res, next) => {
	try {
		const { error } = addShema.validate(req.body);
		if (error) {
			throw HttpError(400, "missing required name field");
		}
		const { contactId } = req.params;
		const updateContact = await listContacts.updateContact(contactId, req.body);
		if (!updateContact) {
			throw HttpError(404, "not found");
		}
		res.json({
			status: "success",
			code: "200",
			body: {
				result: updateContact,
			},
		});
	} catch (error) {
		next(error);
	}
});

module.exports = router;
