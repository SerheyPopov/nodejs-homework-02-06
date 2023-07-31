const { HttpErrors, ctrlWrapper } = require("../../helpers");
const { Contact } = require("../../models");

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

module.exports = { getById: ctrlWrapper(getById) };
