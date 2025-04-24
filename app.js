const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

const app = express();

const dbURI = 'mongodb+srv://netninja:test1234@cluster0.apqi4fn.mongodb.net/node-tuts?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(dbURI)
  .then(() => app.listen(3000))
  .catch((err) => console.log(err));

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.use('/blogs', blogRoutes);

app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});