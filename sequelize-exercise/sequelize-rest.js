const Sequelize = require('sequelize');
const databaseUrl = 'postgres://postgres:secret@localhost:5432/postgres';
const db = new Sequelize(databaseUrl);

db.sync()
    .then(() => console.log('Database connected'))
    .catch(err => console.log(err));

const Movie = db.define('movie', {
    title: Sequelize.STRING,
    yearOfRelease: Sequelize.INTEGER,
    synopsis: Sequelize.STRING
});

Movie.count().then(count => {
    if ((count = 0)) {
        Movie.create({
            title: "A developer's journey",
            yearOfRelease: 2019,
            synopsis:
                'A young professional embarks on a journey to change careers and explore the world of web development.'
        });
        Movie.create({
            title: 'A successful turn',
            yearOfRelease: 2020,
            synopsis:
                'We follow a recent bootcamp graduate through her first programming role as a full stack developer.'
        });
        Movie.create({
            title: 'Master of all scrums',
            yearOfRelease: 2025,
            synopsis:
                'Following the previous adventure, we meet our developer again and reflect back on her learnings.'
        });
    }
});

module.exports = db;
module.exports = Movie;
