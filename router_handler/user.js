const db = require('../db/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')

// 注册的处理函数
exports.register = (req, res) => {
    const userInfo = req.body
    // 判断用户名是否合法
    // 以下的代码已经使用expressJoi和joi中间件取代
    // if (!userInfo.username || !userInfo.password) {
    //     return res.cc('用户名或者密码为空')
    // }
    // 查询数据库
    db.query(
        `select username from ev_users where username=?`,
        [userInfo.username],
        function (err, results) {
            // 报错
            if (err) {
                return res.cc(err)
            }
            // 查询到相同的用户名
            if (results.length > 0) {
                return res.cc('用户名已被占用，请更换用户名')
            }
            // 第二个参数是随机盐的长度
            userInfo.password = bcrypt.hashSync(userInfo.password, 10)
            // 将数据存入数据库
            db.query(
                `insert into ev_users set ?`,
                { username: userInfo.username, password: userInfo.password },
                function (err, results) {
                    if (err) {
                        return res.cc(err)
                    }
                    // sql 语句执行成功，但是影响行数为1
                    if (results.affectedRows !== 1) {
                        return res.cc('用户注册失败，请稍后再试')
                    }
                    res.send({
                        data: {
                            code: 200,
                            msg: '注册成功',
                        },
                    })
                }
            )
        }
    )
}

// 登录的处理函数
exports.login = (req, res) => {
    const userInfo = req.body
    db.query(
        `select username,password from ev_users where username=?`,
        [userInfo.username],
        function (err, results) {
            if (err) {
                return res.cc('发生了错误')
            }
            if (results.length === 0) {
                return res.cc('用户不存在')
            }
            if (!bcrypt.compareSync(userInfo.password, results[0].password)) {
                return res.cc('输入密码错误')
            }
            const user = { ...results[0], password: '' }
            // 生成 token
            const tokenStr = jwt.sign(user, config.jwtSecretKey, {
                expiresIn: config.expiresIN,
            })
            res.send({
                code: 200,
                token: `Bearer ${tokenStr}`,
                msg: '登录成功',
            })
        }
    )
}
