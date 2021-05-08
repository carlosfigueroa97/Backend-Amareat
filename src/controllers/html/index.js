'use strict'

const strings = require('../../helpers/strings');

function index(req, res){
    res.render('index', {
       title: strings.views.titles.home,
       content: strings.views.content.home
    });
}

module.exports = index;