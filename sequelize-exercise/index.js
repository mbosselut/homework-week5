const express = require('express');
const app = express();
const port = 4000;
const db = require('./sequelize-rest');
const Movie = require('./sequelize-rest');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const logging = () => console.log(`Listening on port ${port}...`);
app.use(jsonParser);

app.get('/movie', (req, res, next) => {
    Movie.findAll()
        .then(films => res.json(films))
        .catch(err => next(err));
});

app.get('/movie/:id', (req, res, next) => {
    Movie.findByPk(req.params.id)
        .then(film => res.json(film))
        .catch(err => next(err));
});

app.post('/movie', (req, res, next) => {
    Movie.create(req.body)
        .then(movie => res.json(movie))
        .catch(err => next(err));
});

app.put('/movie/:id', (req, res, next) => {
    Movie.findByPk(req.params.id)
        .then(movie => {
            if (movie) {
                movie.update(req.body).then(movie => res.json(movie));
            } else {
                res.status(404).end();
            }
        })
        .catch(next);
});

app.delete('/movie/:id', (req, res, next) => {
    Movie.findByPk(req.params.id)
        .then(movie => {
            if (movie) {
                movie.destroy();
                res.send(`The movie with id ${req.params.id} got deleted`);
            } else {
                res.status(404).end();
            }
        })
        .catch(err => {
            next(err);
        });
});

app.listen(port, logging);
