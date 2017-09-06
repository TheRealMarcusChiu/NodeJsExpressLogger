/**
 * Created by marcus.chiu on 2017-09-03.
 */
var express = require('express');
const time = require('time');
var router = express.Router();

/* GET log listing. */
router.get('/', function(req, res, next) {
    res.render('log/index', { title: 'LOGGER PAGE' });
});

/* GET log page. */
router.get('/list', function(req, res) {
    var db = req.db;
    var collection = db.get('logcollection');
    collection.find({},{},function(e,docs){
        res.render('log/list', {
            "loglist" : docs
        });
    });
});

/* GET New Log page. */
router.get('/new', function(req, res) {
    res.render('log/new', { title: 'Add New Log' });
});

/* GET edit Log page. */
router.get('/edit/:logId', function(req, res) {
    var collection = req.db.get('logcollection');

    collection.findOne({_id : req.params.logId}, function(e, doc){
        if (doc) {
            res.render('log/edit', {
                "doc" : doc
            });
        }
        else {
            res.render('log/not_found', {
                "id" : req.params.logId
            });
        }
    });
});

router.post('/update', function(req, res) {
    //Set our internal DB variable
    var db = req.db;

    var title = req.body.title;
    var content = req.body.content;
    var timestamp = req.body.timestamp;
    var topics = req.body.topics;

    var collection = db.get('logcollection');

    // Submit to the DB
    collection.update({
        _id : req.body.id
    }, {
        "title" : title,
        "content" : content,
        "timestamp" : timestamp,
        "topics" : topics
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("0");
        }
        else {
            // return success
            res.send("1");
        }
    });
});

/* POST to Add Log Service */
router.post('/add', function(req, res) {
    //Set our internal DB variable
    var db = req.db;

    var title = req.body.title;
    var content = req.body.content;
    var timestamp = getDate(req.body.timestamp);
    var topics = req.body.topics;

    var collection = db.get('logcollection');

    // Submit to the DB
    collection.insert({
        "title" : title,
        "content" : content,
        "timestamp" : timestamp,
        "topics" : topics
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("0");
        }
        else {
            // return success
            res.send("1");
        }
    });
});

/* POST to Add Log Service */
router.post('/delete', function(req, res) {
    //Set our internal DB variable
    var db = req.db;
    var id = req.body.id;
    console.log(id);

    var collection = db.get('logcollection');

    // Submit to the DB
    collection.remove({
        "_id" : id
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("0");
        }
        else {
            // return success
            res.send("1");
        }
    });
});

//////////////////////
// Helper Functions //
//////////////////////

function getDate(timestamp) {
    var date;

    console.log(timestamp);

    if (timestamp.length > 1) {
        date = new time.Date(timestamp);
    } else {
        date = new time.Date();
        date.setTimezone('America/Chicago');
    }

    return date;
}

module.exports = router;
