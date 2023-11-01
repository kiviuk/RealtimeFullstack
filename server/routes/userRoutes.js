const {register, login, updateAvatar} = require("../controllers/userController");
const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.post("/update-avatar/:id", updateAvatar);

module.exports = router;