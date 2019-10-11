let express = require('express'),
    router  = express.Router(),
    passport = require('passport');
    
let User = require('../models/user');

router.get('/',(req, res)=>{
    res.render('landing');
});

module.exports = router;