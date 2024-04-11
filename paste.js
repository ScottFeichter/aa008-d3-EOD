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
  // Do not edit above this line
  if (req.method === "GET" && req.url === "/") {
    const htmlPage = fs.readFileSync("index.html", "utf-8");

    let commentsList = "";

    for (const comment of comments) {
      commentsList += `<p>${comment}</p>`;
    }

    const responseBody = htmlPage.replace(/#{comments}/, commentsList);

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    return res.end(responseBody);
  }

  if (req.method === "GET" && req.url === "/static/styles/index.css") {
    const responseBody = fs.readFileSync("index.css", "utf-8");

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/css");
    return res.end(responseBody);
  }

  if (req.method === "POST" && req.url === "/comments") {
    const { comment } = req.body;

    comments.push(comment);
    res.statusCode = 302;
    res.setHeader("Location", "/");
    console.log("all comments ", comments);
    return res.end();
  }
});
