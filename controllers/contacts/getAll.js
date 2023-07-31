const { ctrlWrapper } = require("../../helpers");
const { Contact } = require("../../models");

const getAll = async (req, res) => {
	const { _id: owner } = req.user;
	const { page = 1, limit = 10, ...favorite } = req.query;
	const skip = (page - 1) * limit;

	const contacts = await Contact.find({ owner, ...favorite }, "-updatedAt", { skip, limit });

	res.json({
		status: "success",
		code: "200",
		body: {
			result: contacts,
		},
	});
};

module.exports = { getAll: ctrlWrapper(getAll) };
