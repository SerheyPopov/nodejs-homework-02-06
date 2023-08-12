require("dotenv").config();

const { User } = require("../../models");
const { HttpErrors, ctrlWrapper, sendEmail } = require("../../helpers");

const { BASE_URL } = process.env;

const recendVerifyEmail = async (req, res) => {
	const { email } = req.body;
	const user = await User.findOne({ email });

	if (!user) {
		throw HttpErrors(404, "Email not found");
	}
	if (user.verify) {
		throw HttpErrors(400, "Verification has already been passed");
	}

	const verifyEmail = {
		to: email,
		subject: "Verify email",
		html: `<a target="_blanc" href="${BASE_URL}/api/auth/verify/${user.verificationToken}">Click verify email</a>`,
	};

	await sendEmail(verifyEmail);

	res.json({
		status: "ok",
		code: "200",
		body: {
			message: "Verification email sent",
		},
	});
};

module.exports = {
	recendVerifyEmail: ctrlWrapper(recendVerifyEmail),
};
