var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var shortid = require('shortid');
var app = express();
var clientPath = path.join(__dirname, '..', 'client');
var jsonPath = path.join(__dirname, 'data.json');

app.use(express.static(clientPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


app.route('/api/chirps')
    .get(function(req, res) {
        res.sendFile(jsonPath);
    })
    .post(function(req, res) {
        fs.readFile(jsonPath, 'utf-8', function(err, fileContents) {
            if (err) {
                res.status(500);
            } else {
                var chirps = JSON.parse(fileContents),
                    chirp = req.body;

                chirp.id = shortid.generate();

                chirps.push(chirp);
                fs.writeFile(jsonPath, JSON.stringify(chirps), function(err, success) {
                    if (err) {
                        res.sendStatus(500);
                    } else {
                        res.status(201);
                        res.send(chirp);
                    }
                });
            }
        });
    });

app.route('/api/chirps/:id')
    .get(function(req, res) {
        fs.readFile(jsonPath, 'utf-8', function(err, fileContents) {
            if (err) {
                res.statusStatus(500);
            } else {
                var chirps = JSON.parse(fileContents);
                var id = req.params.id;
                var response;

                chirps.forEach(function(chirp) {
                    if (chirp.id === id) {
                        response = chirp;
                    }
                });

                if (response) {
                    res.send(response);
                } else {
                    res.sendStatus(404);
                }
            }
        });
    })
    .delete(function(req, res) {
        fs.readFile(jsonPath, 'utf-8', function(err, fileContents) {
            if (err) {
                res.sendStatus(500);
            } else {
                var chirps = JSON.parse(fileContents);
                var id = req.params.id;
                var deleteIndex = -1;

                chirps.forEach(function(chirp, i) {
                    if (chirp.id === id) {
                        deleteIndex = i;
                    }
                });

                if (deleteIndex != -1) {
                    chirps.splice(deleteIndex, 1);
                    fs.writeFile(jsonPath, JSON.stringify(chirps), function(err, success) {
                        if (err) {
                            res.sendStatus(500);
                        } else {
                            res.sendStatus(202);
                        }
                    });
                } else {
                    res.sendStatus(404);
                }
            }
        });
    });

app.listen(3000, function() {
    console.log('Listening on port 3000');
});