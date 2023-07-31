const { HttpErrors, ctrlWrapper } = require("../../helpers");
const { Contact } = require("../../models");

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

module.exports = { editContactById: ctrlWrapper(editContactById) };
