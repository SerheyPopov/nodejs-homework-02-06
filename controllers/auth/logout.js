const { ctrlWrapper } = require("../../helpers");
const { User } = require("../../models");

const logout = async (req, res) => {
	const { _id } = req.user;
	await User.findByIdAndUpdate(_id, { token: "" });
	res.json({
		status: "No Content",
		code: "204",
		massage: "Logout success",
	});
};

module.exports = { logout: ctrlWrapper(logout) };
