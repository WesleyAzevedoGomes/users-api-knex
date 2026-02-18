const express = require("express")
const app = express();
const router = express.Router();
const HomeController = require("../controllers/HomeController");
const UserController = require("../controllers/UserController");
const validateUser = require("../middlewares/validateUser");

router.get('/', HomeController.index);
router.post('/user', validateUser, UserController.create);
router.get('/user', UserController.index);
router.get('/user/:id', UserController.findUser);
router.put('/user', UserController.edit)
router.delete('/user/:id', UserController.delete)
router.post('/recoverPassword', UserController.recoverPassword)
router.post('/changePassword', UserController.changePassword)

module.exports = router;