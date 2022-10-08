const db = require('../db/index')
const path = require('path')

exports.getArticleCates = (req, res) => {
    db.query(
        `select name,alias from ev_article where is_delete=0 order by id asc`,
        function (err, results) {
            if (err) {
                res.cc(err)
            }
            res.send({
                code: 200,
                msg: '获取文章分类列表成功',
                data: results,
            })
        }
    )
}

exports.addArticleCates = (req, res) => {
    db.query(
        `select name from ev_article where name=? or alias=?`,
        [req.body.name, req.body.alias],

        function (err, results) {
            console.log(req.body.name, req.body.alias)
            if (err) {
                return res.cc(err)
            }
            if (results.length !== 0) {
                return res.cc('您的分类名或者名字已经被占用了')
            }
            db.query(
                `insert into ev_article set ?`,
                [req.body],
                function (err, resultss) {
                    if (err) {
                        res.cc(err)
                    }
                    if (resultss.affectedRows !== 1) {
                        return res.cc('操作失败')
                    }
                    res.send({
                        code: 200,
                        msg: '增加文章分类成功',
                    })
                }
            )
        }
    )
}

exports.deleteArticleCates = (req, res) => {
    db.query(
        `update ev_article set is_delete=? where name=?`,
        [0, req.body.name],
        function (err, results) {
            if (err) {
                return res.cc(err)
            }
            if (results.affectedRows !== 1) {
                return res.cc('删除文章失败')
            }
            res.send({
                code: 200,
                msg: '删除文章成功',
            })
        }
    )
}

exports.addArticle = (req, res) => {
    console.log(req.body)
    console.log(req.file)
    res.send({
        code: 200,
    })
    // const articleInfo = {
    //     // 标题、内容、状态、所属的分类Id
    //     ...req.body,
    //     // 文章封面在服务器端的存放路径
    //     cover_img: path.join('/uploads', req.file.filename),
    //     // 文章发布时间
    //     pub_date: new Date(),
    //     // 文章作者的Id
    //     author_id: req.user.id,
    // }
    // if (!req.file || req.file.fieldname !== 'cover_img')
    //     return res.cc('文章封面是必选参数！')

    // // 导入数据库操作模块
    // const db = require('../db/index')

    // // 执行 SQL 语句
    // db.query(`insert into ev_articles set ?`, articleInfo, (err, results) => {
    //     // 执行 SQL 语句失败
    //     if (err) return res.cc(err)

    //     // 执行 SQL 语句成功，但是影响行数不等于 1
    //     if (results.affectedRows !== 1) return res.cc('发布文章失败！')

    //     // 发布文章成功
    //     res.cc('发布文章成功', 0)
    // })
}
