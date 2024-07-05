// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const commentsPath = path.join(__dirname, 'comments.json');

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/comments', (req, res) => {
  fs.readFile(commentsPath, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error reading comments.json');
    } else {
      res.send(data);
    }
  });
});

app.post('/comments', (req, res) => {
  fs.readFile(commentsPath, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error reading comments.json');
    } else {
      const comments = JSON.parse(data);
      comments.push(req.body);
      fs.writeFile(commentsPath, JSON.stringify(comments), (err) => {
        if (err) {
          console.log(err);
          res.status(500).send('Error writing comments.json');
        } else {
          res.send('Comment added');
        }
      });
    }
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});