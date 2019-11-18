const router = require("express").Router();

router.get('/', (req, res) => res.json({msg: "users works"}));

module.exports = router;