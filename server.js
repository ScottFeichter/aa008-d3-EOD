const http = require(`http`);

const server = http.createServer((req, res) => {
  if (req.method === `GET` && req.url === `/`) {
    const responseBody = `html page`;

    res.statusCode = 200;
    res.setHeader(`Content-Type`, `text/plain`);
    return res.end(responseBody);
  }
});

const port = 5001;

server.listen(port, () => console.log(`server is running on port ${port}`));
