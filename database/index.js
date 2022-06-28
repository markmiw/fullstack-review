const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

const repoSchema = new mongoose.Schema({
  userid: {type: String, required: true},
  repoName: {type: String, required: true, unique: true},
  date: {type: Date, required: true},
  url: {type: String, required: true},
}, {strict: true});

const save = (userid, reponame, date, url) => {
  let newRepo = new Repo({
    userid: userid, repoName: reponame, date: date, url: url,
  });
  newRepo.save(function(err, repo) {
    if (err) {
    } else {
      console.log(repo, ' saved');
    }
  });
  // Repo.save({userid: userid, repoName: reponame, date: date, url: url});
};

async function get25(userid, callback) {
  return await Repo.find({userid: userid}).sort({date: 'desc'}).limit(25);
};

const Repo = mongoose.model('Repo', repoSchema);
module.exports.save = save;
module.exports.get25 = get25;
