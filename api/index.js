const router = require('express').Router();
const jarsRouter = require('./jars');

router.use('/jars', jarsRouter);

module.exports = router;
