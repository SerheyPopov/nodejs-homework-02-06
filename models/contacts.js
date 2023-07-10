const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const HttpError = require("../helpers/HttpErrors");

const allContacts = path.join(__dirname, "contacts.json");

const listContacts = async () => {
	try {
		const data = await fs.readFile(allContacts);
		const contacts = JSON.parse(data);
		return contacts;
	} catch (error) {
		throw HttpError(500, "server error");
	}
};

const getContactById = async (contactId) => {
	try {
		const contacts = await listContacts();
		const result = contacts.find((item) => item.id === contactId);
		return result || null;
	} catch (error) {
		throw HttpError(500, "server error");
	}
};

const removeContact = async (contactId) => {
	try {
		const contacts = await listContacts();
		const index = contacts.findIndex((item) => item.id === contactId);
		if (index === -1) {
			return null;
		}
		const [result] = contacts.splice(index, 1);
		await fs.writeFile(allContacts, JSON.stringify(contacts, null, 2));
		return result;
	} catch (error) {
		throw HttpError(500, "server error");
	}
};

const addContact = async (body) => {
	try {
		const contact = await listContacts();
		const newContact = {
			id: nanoid(),
			...body,
		};
		contact.push(newContact);
		await fs.writeFile(allContacts, JSON.stringify(contact, null, 2));
		return newContact;
	} catch (error) {
		throw HttpError(500, "server error");
	}
};

const updateContact = async (contactId, body) => {
	try {
		const contacts = await listContacts();
		const index = contacts.findIndex((item) => item.id === contactId);
		if (index === -1) {
			return null;
		}
		contacts[index] = { contactId, ...body };
		await fs.writeFile(allContacts, JSON.stringify(contacts, null, 2));
		return contacts[index];
	} catch (error) {
		throw HttpError(500, "server error");
	}
};

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
};
