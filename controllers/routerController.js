const { HttpErrors, ctrlWrapper } = require("../helpers");
const { Contact } = require("../models/contact");

const getAll = async (req, res) => {
	const contacts = await Contact.find();
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
	const contactById = await Contact.findById(contactId);
	if (!contactById) {
		throw HttpErrors(404, "not found");
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
	const newContact = await Contact.create(req.body);
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
	const remove = await Contact.findByIdAndDelete(contactId);
	if (!remove) {
		throw HttpErrors(404, "not found");
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
	const updateContact = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
	if (!updateContact) {
		throw HttpErrors(404, "not found");
	}
	res.json({
		status: "success",
		code: "200",
		body: {
			result: updateContact,
		},
	});
};

const updateStatusContact = async (req, res) => {
	const { contactId } = req.params;
	const updateStatus = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
	if (!updateStatus) {
		throw HttpErrors(404, "not found");
	}
	res.json({
		status: "success",
		code: "200",
		body: {
			result: updateStatus,
		},
	});
};

module.exports = {
	getAll: ctrlWrapper(getAll),
	getById: ctrlWrapper(getById),
	postNewContact: ctrlWrapper(postNewContact),
	deleteById: ctrlWrapper(deleteById),
	editContactById: ctrlWrapper(editContactById),
	updateStatusContact: ctrlWrapper(updateStatusContact),
};
