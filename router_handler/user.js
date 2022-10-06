const db = require('../db/index')
const bcrypt = require('bcryptjs')
// 注册的处理函数
exports.regUser = (req, res) => {
    const userInfo = req.body
    // 判断用户名是否合法
    if (!userInfo.userName || !userInfo.password) {
        return res.send({
            code: 201,
            msg: '用户名或者密码为空',
        })
    }
    // 查询数据库
    db.query(
        `select username from ev_users where username=?`,
        [userInfo.userName],
        function (err, results) {
            // 报错
            if (err) {
                return res.send({
                    code: 201,
                    msg: err.message,
                })
            }
            // 查询到相同的用户名
            if (results.length > 0) {
                return res.send({
                    code: 201,
                    msg: '用户名已被占用，请更换用户名',
                })
            }
            // 第二个参数是随机盐的长度
            userInfo.password = bcrypt.hashSync(userInfo.password, 10)
            // 将数据存入数据库
            db.query(
                `insert into ev_users set ?`,
                { username: userInfo.userName, password: userInfo.password },
                function (err, results) {
                    if (err) {
                        return res.send({
                            code: 201,
                            msg: err.message,
                        })
                    }
                    // sql 语句执行成功，但是影响行数为1
                    if (results.affectedRows !== 1) {
                        return res.send({
                            code: 201,
                            msg: '用户注册失败，请稍后再试',
                        })
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
    res.send({
        data: {
            code: 200,
            msg: '登录成功',
        },
    })
}
