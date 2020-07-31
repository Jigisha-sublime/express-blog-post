const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRouter = require('./routes/blogRoutes');

require('dotenv').config();

const app = express();
const MongoUrl = process.env.MONGO_URL
const PORT = process.env.PORT



// connect to the database
mongoose
  .connect(MongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(res => {
    console.log("connected to the database")
    app.listen(PORT || 3000)
  })
  .catch(err => console.log("error in connecting to db", err))



// register view engine 
app.set('view engine', 'ejs')


// middle wares and static files
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))


// requests routes
app.get('/', (req, res) => {
  res.redirect('/blogs')
})

// blogs page routes
app.use('/blogs', blogRouter)


app.get('/about', (req, res) => {

  // rendering ejs files 
  res.render('about', { title: 'About' })

  // sending html files 
  // res.sendFile('./views/about.html', { root: __dirname })
})

app.use((req, res) => {

  // rendering ejs files 
  res.status(400).render('404', { title: '404' })

  // sending html files 
  // res.status(404).sendFile('./views/404.html', { root: __dirname })
})