const { HttpErrors, ctrlWrapper } = require("../../helpers");
const { Contact } = require("../../models");

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

module.exports = { deleteById: ctrlWrapper(deleteById) };
