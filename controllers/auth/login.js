const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { HttpErrors, ctrlWrapper } = require("../../helpers");
const { User } = require("../../models");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });

	if (!user) {
		throw HttpErrors(401, "Email or password is wrong");
	}

	if (!user.verify) {
		throw HttpErrors(401, "Email not verified");
	}

	const passwordCompare = await bcrypt.compare(password, user.password);

	if (!passwordCompare) {
		throw HttpErrors(401, "Email or password is wrong");
	}

	const payload = {
		id: user._id,
	};

	const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

	await User.findByIdAndUpdate(user._id, { token });

	res.json({
		status: "ok",
		code: "200",
		token: token,
		user: {
			email: user.email,
			subscription: user.subscription,
			verify: user.verify,
		},
	});
};

module.exports = { login: ctrlWrapper(login) };
