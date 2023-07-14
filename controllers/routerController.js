const HttpError = require("../helpers/HttpErrors");
const listContacts = require("../models/contacts");
const ctrlWrapper = require("../helpers/ctrlWrapper");

const getAll = async (req, res) => {
	const contacts = await listContacts.listContacts();
	res.json({
		status: "success",
		code: "200",
		body: {
			result: contacts,
		},
	});
};

const getById = async (req, res) => {
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
};

const postNewContact = async (req, res) => {
	const newContact = await listContacts.addContact(req.body);
	res.status(201).json({
		status: "created",
		code: "201",
		body: {
			result: newContact,
		},
	});
};

const deleteById = async (req, res) => {
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
};

const editContactById = async (req, res) => {
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
};

module.exports = {
	getAll: ctrlWrapper(getAll),
	getById: ctrlWrapper(getById),
	postNewContact: ctrlWrapper(postNewContact),
	deleteById: ctrlWrapper(deleteById),
	editContactById: ctrlWrapper(editContactById),
};
