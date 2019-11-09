const Sequelize = require('sequelize');
const databaseUrl = 'postgres://postgres:secret@localhost:5432/postgres';
const db = new Sequelize(databaseUrl);

db.sync()
    .then(() => console.log('Database connected'))
    //Adding 3 movies if the table is empty
    .then(() => Movie.count())
    .then(count => {
        if (count === 0) {
            Movie.create({
                title: 'A promising journey',
                yearOfRelease: 2019,
                synopsis:
                    'A young professional embarks on a journey to change careers and dive into the world of web development.'
            });
            Movie.create({
                title: 'A successful turn',
                yearOfRelease: 2020,
                synopsis:
                    'We follow a recent bootcamp graduate through her first role in tech as a full stack developer.'
            });
            Movie.create({
                title: 'The script master',
                yearOfRelease: 2025,
                synopsis:
                    'Following the previous adventure, we meet our developer again and reflect back on her learnings and continuous development.'
            });
        }
    })
    .catch(err => console.log(err));

const Movie = db.define('movie', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    yearOfRelease: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    synopsis: {
        type: Sequelize.STRING,
        allowNull: true
    }
});

module.exports = db;
module.exports = Movie;
