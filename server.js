const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');


require('dotenv').config();

const recipeModel = require('./api/recipe.model');
const recipeControllers = require('./api/recipe.controllers');

const app = express();


app.use(fileUpload());

app.post('/api/upload', recipeControllers.upload);
app.use(express.static('public'));
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));

const dataBaseURL = process.env.DATABASE;
  // 'mongodb+srv://Spenser:ABCDE@recipes-3zo15.mongodb.net/test?retryWrites=true&w=majority';

app.get('/api/recipes', recipeControllers.findAll);
app.get('/api/recipes/:id', recipeControllers.findById);
app.post('/api/recipes', recipeControllers.add);
app.post('/api/upload', recipeControllers.upload);
app.put('/api/recipes/:id', recipeControllers.update);
app.delete('/api/recipes/:id', recipeControllers.delete);
app.get('/api/import', recipeControllers.import);
app.get('/api/killall', recipeControllers.killall);

mongoose
  .connect(dataBaseURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDb connected'))
  .catch(err => console.log(err));

// const PORT = 4000;
// app.listen(PORT, () => console.log(`Server running at port ${PORT}`));

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
