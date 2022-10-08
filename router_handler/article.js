const db = require('../db/index')
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
