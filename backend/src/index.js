const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3001;

const Controller = require('./controllers/advertsController');
const { validateBody } = require('./middlewares/advertMiddleware');
const handleErrors = require('./middlewares/errors');

const app = express();
app.use(bodyParser.json());

app.get('/adverts/:ID', Controller.getById);
app.get('/adverts', Controller.getAll);
app.put('/adverts/:ID', validateBody, Controller.updateById);
app.delete('/adverts/:ID', Controller.deleteOne);
app.post('/adverts', validateBody, Controller.addNew);


app.use(handleErrors);

app.listen(PORT, () => {
    console.log(`Ouvindo a porta ${PORT}`);
});