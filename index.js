
const path = require('path'); 
const express = require('express');
const app = new express();
const expressEdge = require('express-edge');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Post = require('./models/Post');

mongoose.connect('mongodb://localhost:27017/node-blog', { useNewUrlParser: true })
    .then(() => console.log('You are now connected to Mongo!'))
    .catch(err => console.error('Something went wrong', err))

 
app.use(express.static('public'));

app.use(expressEdge);
app.set('views', __dirname + '/views');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));


// app.get('/', (req, res) => {
//     Post.find()
//     //res.sendFile(path.resolve(__dirname, 'pages/index.html'));
//     res.render('index');
// });


app.get('/', async (req, res) => {
    const posts = await Post.find({})
    res.render('index', {
        posts
    })
});

app.get('/post/:id', async (req, res) => {
    console.log('req', req);
    const post = await Post.findById(req.params.id)
    console.log('post', post)
    res.render('post', {
        post
    })
});

app.get('/create', (req, res) => {
    res.render('create');
});

app.post('/posts/store', (req, res) => {
    Post.create(req.body, (error, post) => {
        console.log();
        res.redirect('/');
    })
});

app.get('/post', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/post.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/contact.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/about.html'));
});
 
app.listen(4000, () => {
    console.log('App listening on port 4000')
});