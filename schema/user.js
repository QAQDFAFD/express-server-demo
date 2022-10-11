// 导入定义验证规则的包
const { exist } = require('@hapi/joi')
const joi = require('@hapi/joi')

// 定义用户名、密码、id、昵称、邮箱的验证规则
const username = joi.string().alphanum().min(1).max(20).required()
const password = joi
    .string()
    .pattern(/^[\S]{6,12}$/)
    .required()
const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const email = joi.string().email().required()
const oldPwd = joi
    .string()
    .pattern(/^[\S]{6,12}$/)
    .required()
const newPwd = joi.not(joi.ref('oldPwd')).concat(password)
const imgUrl = joi.string().required()
const name = joi.string().required()
const alias = joi.string().alphanum().required()

// 关于增加文章的数据
const title = joi.string().required()
const cate_id = joi.number().integer().min(1).required()
const content = joi.string().required().allow('')

// 定义验证注册和登录表单数据的规则对象
exports.reg_login_schema = {
    body: {
        username,
        password,
    },
}

exports.update_userInfo_schema = {
    body: {
        username,
        email,
    },
}

exports.change_password_schema = {
    body: {
        oldPwd,
        newPwd,
        username,
    },
}

exports.change_avator = {
    body: {
        imgUrl,
        username,
    },
}

exports.add_cates = {
    body: {
        name,
        alias,
    },
}

exports.delete_cates = {
    body: {
        name,
    },
}

exports.add_article = {
    body: {
        title,
        cate_id,
        content,
    },
}
