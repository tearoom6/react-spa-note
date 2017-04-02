const express = require('express');
const http = require('http');
const _ = require('lodash');
const app = express();
const PORT = process.env.PORT || 8080;

let count = 0;

const countTemplate = `<span id='count'><%= count %></span>`;

const template = `
<div>Hello, Guest No. ${countTemplate}!</div>
<button id='button'>count up</button>
<script>
  const countCompiled = ${_.template(countTemplate)};
  document.getElementById('button').addEventListener('click', () => {
    // Client-Side Rendering
    // Perform partial rendering of the response of XHR (XMLHttpRequest).
    const req = new XMLHttpRequest();
    req.onload = (e) => {
      const count = document.getElementById('count');
      const result = JSON.parse(e.target.response);
      count.innerHTML = countCompiled(result);
    };
    req.open('GET', '/api/count');
    req.send();
  });
</script>
`;

const compiled = _.template(template);

// API which returns count.
app.use('/api/count', (req, res, next) => {
  // Return json.
  res.json({
    count: count++
  });
});

// Ignore requests for favicon.
app.use('/favicon.ico', (req, res, next) => {
  res.sendStatus(404);
});

// Server-Side Rendering
app.use((req, res, next) => {
  // Request to API (/api/count) internally and use the response for rendering.
  http.get({
    port: PORT,
    path: '/api/count'
  }, (response) => {
    let data = '';
    response.on('readable', () => {
      const chunk = response.read();
      if (chunk) {
        data += chunk;
      }
    });

    // Return html.
    response.on('end', () => {
      res.send(compiled(JSON.parse(data)));
    });
  });
});

app.listen(PORT);

