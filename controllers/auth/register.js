const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
require("dotenv").config();

const { HttpErrors, ctrlWrapper, sendEmail } = require("../../helpers");
const { User } = require("../../models");
const { BASE_URL } = process.env;

const register = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });

	if (user) {
		throw HttpErrors(409, "Email in use");
	}

	const hashPassword = await bcrypt.hash(password, 10);
	const avatarURL = gravatar.url(email);
	const verificationToken = nanoid();

	const newUser = await User.create({
		...req.body,
		password: hashPassword,
		avatarURL,
		verificationToken,
	});

	const verifyEmail = {
		to: email,
		subject: "Verify email",
		html: `<a target="_blanc" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click verify email</a>`,
	};

	await sendEmail(verifyEmail);

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
