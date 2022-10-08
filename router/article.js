const express = require('express')
const router = express.Router()
const articleHandler = require('../router_handler/article')
const expressJoi = require('@escook/express-joi')
const { reg_login_schema } = require('../schema/user')

router.get('/cates', articleHandler.getArticleCates)

module.exports = router
