const path = require("path");
const fs = require("fs/promises");

const { ctrlWrapper } = require("../../helpers");
const { User } = require("../../models");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");
console.log(avatarsDir, "78222")

const updateAvatar = async (req, res) => {
	const { _id } = req.user;
	const { path: tempUpload, originalName } = req.file;
	const resultUpload = path.join(avatarsDir, originalName);
	await fs.rename(tempUpload, resultUpload);
	const avatarUrl = path.join("avatars", originalName);
	await User.findByIdAndUpdate(_id, { avatarUrl });

	res.json({
		avatarUrl,
	});
};

module.exports = { updateAvatar: ctrlWrapper(updateAvatar) };
