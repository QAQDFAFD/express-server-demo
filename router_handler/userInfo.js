const db = require('../db/index')
exports.getuserInfo = (req, res) => {
    const { username } = req.query
    db.query(
        `select username,nickname,email from ev_users where username=?`,
        [username],
        function (err, results) {
            if (err) {
                return res.cc(err)
            }
            if (results.length > 0) {
                res.send({
                    code: 200,
                    msg: results,
                })
            }
        }
    )
}
