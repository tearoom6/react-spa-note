const fs = require('fs');

let dataDir = __dirname + '/../data';
let data = fs.readdirSync(dataDir).map(fileName => {
  const content = fs.readFileSync(dataDir + '/' + fileName).toString();
  let [title, updated, ...body] = content.split('\n');
  let id = parseInt(fileName);
  body = body.join('\n').trim();
  return { id, title, updated, body, user: 'MyUserName' };
});

fs.writeFileSync(__dirname + '/../src/services/data.js', `module.exports = ${JSON.stringify(data, null, 2)}`);
