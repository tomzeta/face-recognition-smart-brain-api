const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');



const app = express();

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');
const profile = require('./controllers/profile');

var db = require('knex')({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'utente',
      password : '',
      database : 'smart-brain'
    }
  });

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

app.get('/',(req,res) => {res.send('it is working!')})

app.post('/signin', (req,res) => {signin.handleSignIn(req,res,db,bcrypt)})

app.post('/register',(req, res) => {register.handleRegister(req,res,db,bcrypt)})

app.get('/profile/:id', (req,res) => {profile.handleProfileGet(req,res,db)})

app.put('/image', (req,res) => { image.handleImagePost(req,res,db)});
app.post('/image', (req,res) => { image.handleClarifaiCall(req,res)});


const PORT = process.env.PORT;

app.listen(PORT || 3000, () => {
    console.log("app is running on port " + PORT);
});
