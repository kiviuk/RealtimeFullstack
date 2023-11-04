const {
    register,
    login,
    updateAvatar,
    getAllUsers
} = require("../controllers/userController");

const router = require("express").Router();

router.post("/login", login);
router.post("/register", register);
router.get("/allusers/:id", getAllUsers);
router.post("/update-avatar/:id", updateAvatar);

module.exports = router;