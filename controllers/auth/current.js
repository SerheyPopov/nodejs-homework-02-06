const { ctrlWrapper } = require("../../helpers");

const getCurrent = async (req, res) => {
	const { email, subscription } = req.user;
	res.json({
		status: "ok",
		code: "200",
		user: {
			email: email,
			subscription: subscription,
		},
	});
};

module.exports = { getCurrent: ctrlWrapper(getCurrent) };
