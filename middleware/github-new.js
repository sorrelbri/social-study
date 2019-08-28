const fetch = require('node-fetch');
const showdown = require('showdown');
const Lesson = require('../models/lesson');
const Tree = require('../models/tree');
const atob = require('atob');
const btoa = require('btoa');

showdown.setOption('excludeTrailingPunctuationFromURLs', 'true');
const converter = new showdown.Converter();

const token = process.env.GITHUB_TOKEN;
const rootTree = 'https://git.generalassemb.ly/api/v3/repos/SEI-CC/SEI-CC-4/git/trees/master';

module.exports = {
  seedDb
}

function seedDb() {
  createNode(rootTree, 'tree', 'Root')
}

async function createNode(url, nodeType, nodeName) {
  let options = {
    url,
    headers: {
      'User-Agent': 'sorrelbri',
      'Authorization': `token ${token}`
    }
  };
  let cb = nodeType === 'tree' ? createTree : createLesson;
  fetch(options).then(results => {
    console.log(results)
    cb(results)
    // let newNode = results.newNode;
    // let body = results.body;
    // newNode.name = nodeName;
    // if (body.tree) {
    //   let promises = body.tree.map(node => createNode(node.url, node.type, node.path))
    //   Promise.all(promises)
    //   .then(newChildren => {
    //     newNode.childTrees = newChildren.filter(child => child.tree).map(child => child._id);
    //     newNode.childLessons = newChildren.filter(child => child.content).map(child => child._id);
    //     newNode.save()
    //   })
    // }
  })
  // newNode.save()
  // .then(newNode => newNode)
}


async function createTree(err, res, body) {
  body = JSON.parse(body);
  let newTree = await Tree.create({
  name: body.path,
  url: body.url,
  })
  return { newNode: newTree, body }
}

async function createLesson(err, res, body) {
  body = JSON.parse(body);
  let newLesson = await parseLesson(body)
  return { newNode: newLesson, body }
}

function parseLesson(body) {
  // parse JSON to string, unencode and make HTML
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