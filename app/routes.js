 // app/routes.js

var Palindrome = require('./models/palindrome.js');
var request = require('request');
var key = process.env.WORDNIK_API_KEY;
// var express = require('express');

    module.exports = function(app) {

        app.get('/api/palindromes', function(req, res) {
            // console.log('INSIDE GET!!!');
            Palindrome.find(function(err, palindromes) {
                if (err) {
                    res.send(err);
                }
                res.json(palindromes);
            });
        });

        app.post('/api/checkWords', function(req, res) {
            console.log('Inside checkWords Post: ', req.body);
            //get query from req
            var query = req.body.word;
            // make the request of reddit
            request("https://api.wordnik.com/v4/word.json/" + query + "/definitions?limit=200&includeRelated=false&useCanonical=false&includeTags=false&api_key=" + key, function(error, response, body) {
                if (error) {
                  console.log('Something went wrong with wordnik', error);
                  res.send(error);
                } else {
                  //send off the results
                  res.send(body);
                }
            });
        });

        app.post('/api/palindromes', function(req, res) {
            console.log('Save User Entry: ', req.body)
            var userEntry = new Palindrome({
                name: req.body.entry,
                lintedName: req.body.lintedEntry
            });
            userEntry.save(function(err, resp) {
                if (err) {
                    res.send(err);
                    console.log(err);
                    // console.log('Fail saving to server');
                } else {
                   res.send({message:'the palindrome has been saved'}); 
                    // console.log('Success saving to server');
                }
            });
        });

        // frontend routes =========================================================
        // route to handle all angular requests
        app.get('*', function(req, res) {
            res.sendfile('./public/index.html'); // load public/index.html file
        });

    };
