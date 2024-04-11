const http = require(`http`);
const fs = require(`fs`);

const comments = [];

const server = http.createServer((req, res) => {

  req.on("end", () => {
    // Parsing the body of the request
    // x-www-form-urlencoded
    if (reqBody) {
      //query=mars+rover%21&commit=Search
      req.body = reqBody
        .split("&") //[query=mars+rover%21,commit=Search]
        .map((keyValuePair) => keyValuePair.split("=")) //[[query,mars+rover%21],[commit,Search]]
        .map(([key, value]) => [key, value.replace(/\+/g, " ")]) // [[query,mars rover%21],[commit,Search]]
        .map(([key, value]) => [key, decodeURIComponent(value)]) // [[query,mars rover!],[commit,Search]]
        .reduce((acc, [key, value]) => {
          acc[key] = value;
          return acc;
        }, {});
      /*
          {
            query: mars rover!,
            commit: Search
          }

        */
      console.log(req.body);
    }




  // route for index.html
  if (req.method === `GET` && req.url === `/`) {
    const htmlPage = fs.readFileSync(`index.html`, `utf-8`)

    let commentsList = ""

    for (const comment of comments) {
      commentsList += `<p>${comment}</p>`
    }

    const responseBody = htmlPage.replace(/#{comments}/, commentsList);

    res.statusCode = 200;
    res.setHeader(`Content-Type`, `text/html`);
    return res.end(responseBody);
  }

  // route for index.css
  if (req.method === `GET` && req.url === `/static/styles/index.css`) {
    const responseBody = fs.readFileSync("index.css", "utf-8");

    res.statusCode = 200;
    res.setHeader('Content-Type', `text/css`);
    return res.end(responseBody);
  }

  // route for comment submit
  if(req.method === `POST` && req.url === `/comments`) {
  const { comment } = res.body;

  comments.push(comment);
  res.statusCode = 302;
  res.setHeader(`Location`, `/`);
  console.log(comments);
  res.end();
  }


});

const port = 5001;

server.listen(port, () => console.log(`server is running on port ${port}`));
