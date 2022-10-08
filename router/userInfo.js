const express = require('express')
const userInfoHandler = require('../router_handler/userInfo')
const expressJoi = require('@escook/express-joi')
const {
    updata_userInfo_schema,
    change_password_schema,
    change_avator,
} = require('../schema/user')

// 创建路由对象
const router = express.Router()

//获取用户信息的接口
router.get('/userInfo', userInfoHandler.getuserInfo)

// 更新用户信息的接口
router.post(
    '/updateUserInfo',
    expressJoi(updata_userInfo_schema),
    userInfoHandler.updateUserInfo
)

// 修改用户的密码的接口
router.post(
    '/changePwd',
    expressJoi(change_password_schema),
    userInfoHandler.changePwd
)

// 修改用户的头像的接口
router.post(
    '/changeAvator',
    expressJoi(change_avator),
    userInfoHandler.changeAvator
)

module.exports = router
