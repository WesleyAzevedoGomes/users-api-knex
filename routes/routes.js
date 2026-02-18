const express = require("express")
const app = express();
const router = express.Router();
const HomeController = require("../controllers/HomeController");
const UserController = require("../controllers/UserController");
const validateUser = require("../middlewares/validateUser");
const AdminAuth = require('../middlewares/AdminAuth')

router.get('/', HomeController.index);
router.post('/user', AdminAuth, validateUser, UserController.create);
router.get('/user', AdminAuth, UserController.index);
router.get('/user/:id', AdminAuth, UserController.findUser);
router.put('/user', AdminAuth, UserController.edit)
router.delete('/user/:id', AdminAuth, UserController.delete)
router.post('/recoverPassword', AdminAuth, UserController.recoverPassword)
router.post('/changePassword', AdminAuth, UserController.changePassword)
router.post('/login', UserController.login)

module.exports = router;