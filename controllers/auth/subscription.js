const { HttpErrors, ctrlWrapper } = require("../../helpers");
const { User } = require("../../models");

const subscription = async (req, res) => {
	const { _id } = req.user;
	const { subscription } = req.body;
	switch (subscription) {
		case "starter":
			break;
		case "pro":
			break;
		case "business":
			break;
		default:
			throw HttpErrors(400, "Bad Request ");
	}
	const updateStatus = await User.findByIdAndUpdate(_id, req.body, { new: true });
	res.json({
		status: "success",
		code: "200",
		body: {
			result: updateStatus,
		},
	});
};

module.exports = { subscription: ctrlWrapper(subscription) };
