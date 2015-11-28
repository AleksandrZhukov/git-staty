// node-debug --web-host 192.168.0.4 --cli index.js

var exec = require('child_process').execSync,
  fs = require("fs"),
  repo = '../frontend-kit', //process.argv[2]
  commits;


process.chdir(repo);

commits = exec('git rev-list HEAD').toString().split(/\r\n|\r|\n/g);
console.log(commits)

commits.forEach(function(comm) {
  console.log(comm)
  debugger
  if (!comm) return;
  var files = exec('git diff-tree  -r --no-commit-id ' + comm).toString().split(/\r\n|\r|\n/g);
  console.log(files)
  files.forEach(function(file) {
    debugger
    if (!file) return;
    var fileInfo = file.replace('	', ' ').split(' ');
    if (fileInfo[4] !== 'D') {
      var size = exec('git cat-file -s ' + fileInfo[3]);
    }
    console.log('file: ' + fileInfo[5] + ' size: ' + size)
  })
});


