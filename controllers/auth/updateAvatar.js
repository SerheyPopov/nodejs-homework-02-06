const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const { ctrlWrapper } = require("../../helpers");
const { User } = require("../../models");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
	const { _id } = req.user;
	const { path: tempUpload, originalname } = req.file;
	const filename = `${_id}_${originalname}`;
	const resultUpload = path.join(avatarsDir, filename);
	await fs.rename(tempUpload, resultUpload);
	const avatarURL = path.join("avatars", filename);

	const image = await Jimp.read(resultUpload);
	await image.resize(250, 250).quality(60).writeAsync(resultUpload);

	await User.findByIdAndUpdate(_id, { avatarURL });

	res.json({
		status: "ok",
		code: "200",
		user: { avatar: avatarURL },
	});
};

module.exports = { updateAvatar: ctrlWrapper(updateAvatar) };
