const router = require("express").Router();

router.get('/', (req, res) => res.json({msg: "profile works"}));

module.exports = router;