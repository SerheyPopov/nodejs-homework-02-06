const { register } = require("./auth/register");
const { login } = require("./auth/login");
const { getCurrent } = require("./auth/current");
const { logout } = require("./auth/logout");
const { subscription } = require("./auth/subscription");
const {updateAvatar}=require("./auth/updateAvatar")

const { getAll } = require("./contacts/getAll");
const { getById } = require("./contacts/getById");
const { postNewContact } = require("./contacts/postNewContact");
const { deleteById } = require("./contacts/deleteById");
const { editContactById } = require("./contacts/editContactById");
const { updateStatusContact } = require("./contacts/updateStatusContact");

module.exports = {
	register,
	login,
	getCurrent,
	logout,
	getAll,
	getById,
	postNewContact,
	deleteById,
	editContactById,
	updateStatusContact,
	subscription,
	updateAvatar,
};
