var express = require('express');
var router = express.Router();
var { ensureAuthenticated } = require('../config/auth');
var Homework = require('../models/Homework');
var dateConvert = require('../config/dateConvert');

// Homework.deleteMany({}, (err, doc) => console.log('all data deleted!!'));

router.get('/', (req, res, next) => {
    var username = req.session.username;
    if(username){
        Homework.find({name: username}, (err, homeworks) => {
            res.render('home', {
                theme: req.session.theme,
                username: req.session.username,
                homeworks,
            });
        });
    }else{
        res.render('home', {
            theme: req.session.theme,
            username: req.session.username,
            homeworks: [],
        });
    }
});
router.get('/admin', (req, res, next) => {
    Homework.find({}, (err, homeworks) => {
        res.render('admin', {
            theme: req.session.theme,
            username: req.session.username,
            homeworks,
        });
    })
});
router.post('/submit-homework', (req, res, next) => {
    var {name, practiceNum, text} = req.body;
    req.session.username = name;
    var newHomework = new Homework({
        name,
        practiceNum,
        text,
        date: dateConvert.getNow(),
        time: dateConvert.getClock(),
    });
    newHomework.save().then(doc => {
        req.flash('success_msg', 'کد شما با موفقیت ارسال شد.');
        res.redirect('/');
    }).catch(err => console.log(err));
});
router.get('/theme', (req, res, next) => {
    const previousUrl = req.get('referer'); // Get the referrer URL from the request headers
    var {theme} = req.query;
    if(theme) req.session.theme = theme;
    if (previousUrl) {
        res.redirect(previousUrl); // Redirect to the previous URL
    } else {
        res.redirect('/'); // Fallback: redirect to home if there's no referrer
    }
})

module.exports = router;
