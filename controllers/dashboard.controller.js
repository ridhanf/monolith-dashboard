const moment = require('moment');
const { Article } = require('../models')

// const posts = [
//   {
//     id: 1,
//     title: 'Harry Potter',
//     body: 'Voldemort kill Dumbledore',
//     createAt: Date()
//   },
//   {
//     id: 2,
//     title: 'Tom Sawyer',
//     body: 'The adventure of Tom Sawyer',
//     createAt: Date()
//   }
// ]

const home = (req, res) => {
  const locals = {
    data: {
      Post: 10,
      Visitor: 100,
      Reader: 10
    },
    contentTitle: "Statistic",
    layout: 'layouts/dashboard'
  }
  return res.render('pages/dashboard/home', locals)
}

const post = async (req, res) => {
  let posts;
  try {
    posts = await Article.findAll({
      where: {
        approved: true
      }
    })
  } catch (error) {
    return res.render('pages/default/error');
  }
  
  const locals = {
    data: {
      posts: posts.map(i => {
        i.fromNow = moment(i.createAt).fromNow()
        return i
      })
    },
    contentTitle: 'Post',
    layout: 'layouts/dashboard'
  }
  return res.render('pages/dashboard/post', locals)
}

module.exports = {
  home,
  post
}