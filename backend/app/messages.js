const express = require('express');
const router = express.Router();
const modules = require('../modules/ModMessage');

router.get('/', (req, res) => {

  if (!req.query.datetime) {
    const messages = modules.getMessages();

    res.send(messages);
  } else {
    const date = new Date(req.query.datetime);
    if (isNaN(date.getDate())) {
      res.send ({error: "Invalid Date"});
    } else {
    const message = modules.getMessage(req.query.datetime);
    if (!message) {
      res.send({error: "Incorrect date"});
    } else {
      res.send(message);
    }}}
});

router.post('/', (req, res) => {
  if (!req.body.author || !req.body.message) {
    return res.status(422).send({error: 'Нет данных для обработки'})
  };

  const newMessage = modules.addMessage({
    message: req.body.message,
    author: req.body.author
  });

  res.send(newMessage);
});

module.exports = router;