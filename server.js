const http = require(`http`);
const fs = require(`fs`);

const comments = [];

const server = http.createServer((req, res) => {
  if (req.method === `GET` && req.url === `/`) {
    const responseBody = fs.readFileSync(`index.html`, `utf-8`)

    res.statusCode = 200;
    res.setHeader(`Content-Type`, `text/html`);
    return res.end(responseBody);
  }

  if (req.method === `GET` && req.url === `/static/styles/index.css`) {
    const responseBody = fs.readFileSync("index.css", "utf-8");

    res.statusCode = 200;
    res.setHeader('Content-Type', `text/css`);
    return res.end(responseBody);
  }
});

const port = 5001;

server.listen(port, () => console.log(`server is running on port ${port}`));
