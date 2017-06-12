"use strict";

const express = require("express"),
      http    = require("http"),
      consul  = require("./consul");

const app = express();

const server = http.createServer(app);

require("./api")(app);

server.listen(3000, () => {
  console.log("Express server listening on port: " + 3000);
  consul.watch("config/some-key", data => console.log(data), {});
  consul.watch("config/some-key-recurse", data => console.log(data), {});
  consul.watch("config/some-key-recurse", data => console.log(data), { recurse: true });
});

