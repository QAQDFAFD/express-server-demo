const express = require('express')
const userHandler = require('../router_handler/user')
// 创建路由对象
const router = express.Router()

// 注册新用户
router.post('/register', userHandler.regUser)

// 登录
router.post('/login', userHandler.login)

// 抛出
module.exports = router
