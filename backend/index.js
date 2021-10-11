const express = require('express');
const cors = require('cors');
const messages = require('./app/messages');
const modules = require('./modules/ModMessage');

const app = express();
app.use(express.json());
app.use(cors());

const port = 8000;

app.use('/messages', messages);

modules.init();
app.listen(port, () => {
  console.log('Server started on ', port);
});

