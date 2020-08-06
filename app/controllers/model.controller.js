const Model = require("../models/model.model.js");

exports.createModel = (req, res) => {
  //validate request
  if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
  }

  //create a model
  const model = new Model({
      planeModel: req.body.planeModel,
      fullName: req.body.fullName,
      role: req.body.role,
      manufacturer: req.body.manufacturer
  });

  //save model in db
  Model.createModel(model, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Model."
        });
      else res.send(data);
    });
};

exports.findAll = (req, res) => {
  Model.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving models."
      });
    else res.send(data);
  });
};


exports.findOne = (req, res) => {
  Model.findById(req.params.planeModel, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found model with planeModel ${req.params.planeModel}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving model with planeModel " + req.params.planeModel
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  Model.remove(req.params.planeModel, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found model with planeModel ${req.params.planeModel}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete model with planeModel" + req.params.planeModel
        });
      }
    } else res.send({ message: `model was deleted successfully!` });
  });
};

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Model.updateByPlaneModel(
    req.params.planeModel,
    new Model(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found model with planeModel ${req.params.planeModel}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating model with planeModel " + req.params.planeModel
          });
        }
      } else res.send(data);
    }
  );
};