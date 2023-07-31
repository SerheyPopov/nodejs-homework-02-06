const { ctrlWrapper } = require("../../helpers");
const { Contact } = require("../../models");

const postNewContact = async (req, res) => {
	const { _id: owner } = req.user;
	const newContact = await Contact.create({ ...req.body, owner });
	res.status(201).json({
		status: "created",
		code: "201",
		body: {
			result: newContact,
		},
	});
};

module.exports = { postNewContact: ctrlWrapper(postNewContact) };
