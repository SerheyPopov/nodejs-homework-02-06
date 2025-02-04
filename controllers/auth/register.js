const bcrypt = require("bcrypt");
const gravatar = require("gravatar");

const { HttpErrors, ctrlWrapper } = require("../../helpers");
const { User } = require("../../models");

const register = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });

	if (user) {
		throw HttpErrors(409, "Email in use");
	}

	const hashPassword = await bcrypt.hash(password, 10);
	const avatarURL = gravatar.url(email);

	const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL });
	res.status(201).json({
		status: "created",
		code: "201",
		user: {
			email: newUser.email,
			subscription: newUser.subscription,
			avatar: newUser.avatarURL,
		},
	});
};

module.exports = { register: ctrlWrapper(register) };
