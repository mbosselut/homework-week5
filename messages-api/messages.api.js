const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const port = 3000;

const logging = () => console.log(`Listening on port ${port}...`);
app.use(jsonParser);

let apiCalls = 0;

app.post('/messages', (req, res) => {
    const text = req.body.text;
    if (apiCalls < 5) {
        if (!text || text === '') {
            res.status(400).end();
        } else {
            res.json({ message: 'Message received loud and clear' });
        }
    } else {
        res.status(429).end();
    }
    apiCalls++;
});

app.listen(port, logging);
