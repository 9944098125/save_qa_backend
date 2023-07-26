const router = require("express").Router();

const { register, login } = require("../controllers/auth");

router.route("/register").post(register);

router.route("/login").post(login);

// router.route("/get-users").get(getUsers);

// router.route("/deleteUsers").delete(deleteAllUsers);

module.exports = router;
