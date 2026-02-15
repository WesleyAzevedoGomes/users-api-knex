const express = require("express")
const app = express();
const router = express.Router();
const HomeController = require("../controllers/HomeController");
const UserController = require("../controllers/UserController");
const validateUser = require("../middlewares/validateUser");

router.get('/', HomeController.index);
router.post('/user', validateUser, UserController.create);

module.exports = router;