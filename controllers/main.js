const Main = require('../models/user');

function showRoute(req, res, next) {
  return Main.findById(req.params.id)
    .then(main => res.json(main))
    .catch(next);
}

function updateRoute(req, res, next) {
  return Main.findById(req.params.id)
    .then(main => Object.assign(main, req.body))
    .then(main => main.save())
    .then(main => res.json(main))
    .catch(next);
}

module.exports = {
  show: showRoute,
  update: updateRoute
};
