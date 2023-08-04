const express = require("express");

const { validateBody } = require("../../middlewares");
const ctrl = require("../../controllers");
const { authenticate } = require("../../middlewares");
const upload = require("../../middlewares/upload")

const { shemas } = require("../../models");

const router = express.Router();

router.post("/register", validateBody(shemas.registrationShema), ctrl.register);

router.post("/login", validateBody(shemas.loginShema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch("/users", validateBody(shemas.statusShema), authenticate, ctrl.subscription);

router.patch("/avatars", authenticate, upload.single("avatar"), ctrl.updateAvatar);

module.exports = router;
