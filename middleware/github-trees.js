const request = require('request');
const showdown = require('showdown');
const Lesson = require('../models/lesson');
const Tree = require('../models/tree');
const atob = require('atob');
const btoa = require('btoa');

showdown.setOption('excludeTrailingPunctuationFromURLs', 'true');
const converter = new showdown.Converter();

const token = process.env.GITHUB_TOKEN;
const rootURL = 'https://git.generalassemb.ly/api/v3/repos/SEI-CC/SEI-CC-4';

module.exports = {
  createLesson
}

function createLesson(req, res, next) {
  let path = '/git/blobs/a03924ee4b852a95d570a790a1090f3440ee7dae';
  let options = {
    url: `${rootURL}${path}`,
    headers: {
      'User-Agent': 'sorrelbri',
      'Authorization': `token ${token}`
    }
  };
  request(options, (err, response, body) => {
    console.log(response);
    parseLesson(body);
  });
}

function parseLesson(body) {
  // parse JSON to string, unencode and make HTML
  body = JSON.parse(body);
  body.content = converter.makeHtml(atob(body.content));
  // define name from h1
  body.name = body.content.substring(body.content.search(/\w(?<=<h1>.)/), body.content.search(/\w(?=<\/h1>)/) + 1)
  // split HTML string into array of tags
  body.content = body.content.replace(/<(?!\/)/g, 'splithere <').split('splithere')
  // iterate over array and add data-position within opening tag then join
  .map((tag, idx) => tag.replace( />/, ` data-position="${idx}">` )).join(' ');
  // body.content = btoa(body.content);
  Lesson.create({
    url: body.url,
    content: body.content,
    name: body.name
  });
}


// request master tree
// create model from master tree
// store urls, names, and types for child nodes
// Promise.all() child node request


function create(path, nodeName, node) {
  let options = {
    url: path,
    headers: {
      'User-Agent': 'sorrelbri',
      'Authorization': `token ${token}`
    }
  }
  request(options, (err, response, body) => {
    body = JSON.parse(body);
    // tree create
    let newNode = node === 'tree' ? createTree(body, nodeName) : createLesson(body, nodeName)
    if (body.tree.find(node => node.type === 'tree')) {
      
    }
  });
}

function createTree(body, name) {
  Tree.create({
    name,
    url: body.url
  })
  .then(newTree => newTree);
}