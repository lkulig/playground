"use strict";

const consul = require("./consul");

const state = {
  enabled: true
};

module.exports = app => {

  app.route("/enable").post((req, res) => {
    state.enabled = true;
    res.status(200).json(state);
  });

  app.route("/disable").post((req, res) => {
    state.enabled = false;
    res.status(200).json(state);
  });

  app.route("/health").get((req, res) => {
    if (state.enabled) {
      res.status(200).end();
      return;
    }

    res.status(500).end();
  });

  app.route("/list-nodes").get((req, res) => {
    consul.inner.catalog.node.list((err, result) =>{
      if (err) {
        res.status(500).end();
        return;
      }

      res.status(200).json(result);
    });
  });

  app.route("/list-services").get((req, res) => {
    consul.inner.catalog.service.list((err, result) => {
      if (err) {
        res.status(500).end();
        return;
      }

      res.status(200).json(result);
    });
  });

  app.route("/nodes/:node/health").get((req, res) => {
    consul.inner.health.node(req.params.node, (err, result) => {
      if (err) {
        res.status(500).end();
        return;
      }

      res.status(200).json(result);
    });
  });

  app.route("/services/:service/checks").get((req, res) => {
    consul.inner.health.checks(req.params.service, (err, result) => {
      if (err) {
        res.status(500).end();
        return;
      }

      res.status(200).json(result);
    });
  });

  app.route("/services/:service/health").get((req, res) => {
    consul.inner.health.service(req.params.service, (err, result) => {
      if (err) {
        res.status(500).end();
        return;
      }

      res.status(200).json(result);
    });
  });

  app.route("/checks/:state").get((req, res) => {
    consul.inner.health.state(req.params.state, (err, result) => {
      if (err) {
        res.status(500).end();
        return;
      }

      res.status(200).json(result);
    });
  });
};
