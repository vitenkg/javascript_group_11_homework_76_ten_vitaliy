const fs = require('fs');
const {nanoid} = require("nanoid");

const filename = '../messagesServer.json';
let data = [];

module.exports = {
  init() {
    try {
      const fileContents = fs.readFileSync(filename);
      data = JSON.parse(fileContents);

    } catch (e) {
      data = [];
    }
  },
  getMessage(datetime) {
    let lastMsg = [];
    const oldMsg = [...data];
    for (let i = 0; i < data.length; i++) {

      if (data[i].datetime === datetime) {
        oldMsg.splice(0, i+1);
      }
    };
    lastMsg = [...oldMsg];

    if (lastMsg === undefined) {
      lastMsg = [];
    }

    return lastMsg;
  },
  getMessages() {

    if (data.length <= 30) {
      return data;
    } else {
      const eraseElements = data.length - 30;
      return data.splice(0, eraseElements);
    }

  },
  addMessage(mess) {
    mess.id = nanoid();
    mess.datetime = new Date().toISOString();
    data.push(mess);
    this.save();
    return mess;
  },
  eraseMessages() {
    data = [];
    this.save();
    return data;
  },
  save() {
    console.log('file was saved');
    fs.writeFileSync(filename, JSON.stringify(data));
  }

};