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
  // createLesson,
  createTree,
  fillTrees
}

function createTree(path) {
  let options = {
    url: path,
    headers: {
      'User-Agent': 'sorrelbri',
      'Authorization': `token ${token}`
    }
  }
  request(options, (err, response, body) => {
    body = JSON.parse(body);
    console.log(body)
    let childTrees = body.tree.filter(node => node.type === 'tree')
    .map(node => node.url);
    // let childLessons = body.tree.filter(node => node.type === 'blob')
    // .map(node => [{}]);
    // console.log(childTrees, childLessons)
    Tree.create({
    name: body.path,
    url: body.url,
    })
    .then(tree => tree.childTrees = createTree(childTrees))
  }
  );
}

function createLesson(path, name) {
  let options = {
    url: `${rootURL}${path}`,
    headers: {
      'User-Agent': 'sorrelbri',
      'Authorization': `token ${token}`
    }
  };
  request(options, (err, response, body) => {
    parseLesson(body, name);
  });
}

function parseLesson(body) {
  // parse JSON to string, unencode and make HTML
  body = JSON.parse(body);
  body.content = converter.makeHtml(atob(body.content));
  // define name from h1
  // body.name = body.content.substring(body.content.search(/\w(?<=<h1>.)/), body.content.search(/\w(?=<\/h1>)/) + 1)
  // split HTML string into array of tags
  body.content = body.content.replace(/<(?!\/)/g, 'splithere <').split('splithere')
  // iterate over array and add data-position within opening tag then join
  .map((tag, idx) => tag.replace( />/, ` data-position="${idx}">` )).join(' ');
  // body.content = btoa(body.content);
  Lesson.create({
    url: body.url,
    content: body.content,
    name: name
  });
}

function fillTrees() {
  Tree.find({}).then(trees => {
    trees = trees.filter(tree => !tree.name);
    trees.forEach(tree => {
      let options = {
        url: tree.url,
        headers: {
          'User-Agent': 'sorrelbri',
          'Authorization': `token ${token}`
        }
      };
      request(options, (err, response, body) => {
        body = JSON.parse(body);
        tree.name = body.path,
        tree.save();
      })
    })
  })
}
