/*global require, process, __dirname */
/*eslint no-undef: "error"*/
const express = require("express");
const compression = require("compression");
const morgan = require("morgan");
const path = require("path");
const fetch = require("node-fetch");

const normalizePort = port => parseInt(port, 10);
const PORT = normalizePort(process.env.PORT || 3001);

const app = express();

app.disable("x-powered-by");
app.use(compression());
app.use(morgan("common"));

console.log(`working...`);

app.get("/api", (req, res) => {
  const baseColor = req.query.baseColor;
  const URL = `https://www.thecolorapi.com/scheme?hex=${baseColor}&mode=monochrome`;
  fetch(URL)
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log("the data: ", data);
      res.send(JSON.stringify(data));
    })
    .catch(e => {
      console.log("error catch block response fetch: ", e);
    });
});

// Node/Express to serve static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  // Forward all extra requests static build in client
  app.get("*", (req, res) => {
    // Send any other requests to the index.html page
    console.log(`hit Herokuproxy(${PORT}) or express proxy(port3001)`);
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
  });
}

app.listen(PORT, err => {
  if (err) throw err;
  console.log(`Server started and listening on ${PORT}`);
});
