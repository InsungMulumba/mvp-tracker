//import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// define the Express app
const app = express();

// the database
const players = [];

// enhance your app security with Helmet
app.use(helmet());

// use bodyParser to parse application/json content-type
app.use(bodyParser.json());

// enable all CORS requests
app.use(cors());

// log HTTP requests
app.use(morgan('combined'));

// retrieve all players
app.get('/', (req, res) => {
  const qs = players.map(q => ({
    id: q.id,
    name: q.name,
    team: q.team,
    stats: q.stats.length,
  }));
  res.send(qs);
});

// get a specific player
app.get('/:id', (req, res) => {
  const player = players.filter(q => (q.id === parseInt(req.params.id)));
  if (player.length > 1) return res.status(500).send();
  if (player.length === 0) return res.status(404).send();
  res.send(player[0]);
});

// insert a new player
app.post('/', (req, res) => {
  const {name, team} = req.body;
  const newplayer = {
    id: players.length + 1,
    name,
    team,
    stats: [],
  };
  players.push(newplayer);
  res.status(200).send();
});

// insert a new statistic to a player
app.post('/statistic/:id', (req, res) => {
  const {statistic} = req.body;

  const player = players.filter(q => (q.id === parseInt(req.params.id)));
  if (player.length > 1) return res.status(500).send();
  if (player.length === 0) return res.status(404).send();

  player[0].stats.push({
    statistic,
  });

  res.status(200).send();
});

// start the server
app.listen(8081, () => {
  console.log('listening on port 8081');
});