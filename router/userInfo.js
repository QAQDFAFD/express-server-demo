const express = require('express')
const userInfoHandler = require('../router_handler/userInfo')
const expressJoi = require('@escook/express-joi')
const { reg_login_schema } = require('../schema/user')

// 创建路由对象
const router = express.Router()

router.get('/userInfo', userInfoHandler.getuserInfo)

module.exports = router
