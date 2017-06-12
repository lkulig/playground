"use strict";

const config = {
  host: "consul",
  port: 8500
};

const _      = require("lodash"),
      consul = require("consul")(config);

function consulWatch(key, onChange, options) {
  const watch = consul.watch({ method: consul.kv.get, options: _.merge({ key: key }, options) });
  watch.on("change", onChange);
  return watch;
}

module.exports = {
  watch: consulWatch,
  inner : consul,
};
