const { HttpErrors, ctrlWrapper } = require("../../helpers");
const { Contact } = require("../../models");

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

module.exports = { updateStatusContact: ctrlWrapper(updateStatusContact) };
