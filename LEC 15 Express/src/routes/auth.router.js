const exports = require('express')

let router = express.Router()

router.get ( "/", (req, res) => {
    res.send("Auth home route")
    })


module.exports = router;