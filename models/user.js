const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const userShema = new Schema(
	{
		password: {
			type: String,
			required: [true, "Set password for user"],
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			unique: true,
		},
		subscription: {
			type: String,
			enum: ["starter", "pro", "business"],
			default: "starter",
		},
		avatarURL: String,

		token: String,
	},
	{ versionKey: false, timestamps: true }
);

userShema.post("save", handleMongooseError);

const registrationShema = Joi.object({
	email: Joi.string().required(),
	password: Joi.string().required(),
	subscription: Joi.string(),
});

const loginShema = Joi.object({
	email: Joi.string().required(),
	password: Joi.string().required(),
});
const statusShema = Joi.object({
	subscription: Joi.string().required(),
});

const shemas = {
	registrationShema,
	loginShema,
	statusShema,
};

const User = model("user", userShema);

module.exports = { User, shemas };
