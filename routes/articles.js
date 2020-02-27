var express = require('express');
var router = express.Router();
const IndexController = require('../controller/indexController')
const CustomerController = require('../controller/customerController')

router.get('/', IndexController.getIndex)
router.get('/articles/:article' , IndexController.getSingleArticle)
router.get('/signup' , CustomerController.getSignUp)
router.post('/signup' , CustomerController.postSignup)
router.get('/login' , CustomerController.getLogin)
router.post('/login' , CustomerController.postLogin)
router.get('/dashboard' , CustomerController.getDashboard)
router.get('/articles/add' , IndexController.getAdd)
router.post('/articles/add' , IndexController.postAdd)
router.get('/articles/edit/:single' , IndexController.getEditArticle)
router.post('/articles/edit/:single' , IndexController.postEditArticle)
router.get('/articles/delete/:single' , IndexController.getDeleteArticle)
router.get('/logout' , CustomerController.getLogout)



module.exports = router;
