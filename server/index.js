const express = require('express');
const app = express();
const getReposByUsername = require('../helpers/github.js');
const db = require('../database/index.js');

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());
app.use(express.urlencoded());

app.post('/repos', async function(req, res) {
    getReposByUsername.getReposByUsername(req.body.username).then((response) => {
    for (let i = 0; i < response.data.length; i++) {
      const userid = response.data[i].owner.login;
      const reponame = response.data[i].name;
      const url = response.data[i].svn_url;
      const date = response.data[i].updated_at;
      db.save(userid, reponame, date, url);
    }
    res.end();
  }).catch(() => {
    console.log('error posting');
    res.end();
  });
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
});

app.get('/repos', function(req, res) {
  const username = req.query.username;
  // next('route');
  // console.log('response here ', res);
  db.get25(username).then(function(data) {
    const newData = {
      username: data[0].userid,
      repos: [],
    };
    for (let i = 0; i < data.length; i++) {
      newData.repos.push([data[i].repoName, data[i].url]);
    }
    res.end(JSON.stringify(newData));
  }).then(() => {
  }).catch(() => {
    res.end();
  });
  // TODO - your code here!
  // This route should send back the top 25 repos
});

const port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

