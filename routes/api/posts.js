const router = require("express").Router();

router.get('/', (req, res) => res.json({msg: "posts works"}));

module.exports = router;