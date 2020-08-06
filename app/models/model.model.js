const sql = require("./db.js");

//constructor for Model
const Model = function(model) {
    this.planeModel = model.planeModel;
    this.fullName = model.fullName;
    this.role = model.role;
    this.manufacturer = model.manufacturer
};

Model.createModel = (newModel, result) => {
    //Create a Model
    sql.query("insert into model set planeModel = ?, fullName = ?, role = ?, manufacturer = ?", 
    [newModel.planeModel, newModel.fullName, newModel.role, newModel.manufacturer], 
    (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created model: ", {id: res.insertId, ...newModel});
        result(null, {id: res.insertId, ...newModel});
    });
};
//return all rows in model
Model.getAll = result => {
    sql.query("SELECT * FROM model", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("models: ", res);
      result(null, res);
    });
};
//find a model by planeModel(ID)
  Model.findById = (planeModel, result) => {
    sql.query(`SELECT * FROM model WHERE planeModel = ${planeModel}`, (err, res) => {
    if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("models: ", res);
      result(null, res);
    
  
      // not found model with the planeModel
      result({ kind: "not_found" }, null);
    });
  };

  Model.remove = (planeModel, result) => {
    sql.query(`DELETE FROM model WHERE planeModel = ${planeModel}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found model with the planeModel
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted model with planeModel: ", planeModel);
      result(null, res);
    });
  };

  Model.updateByPlaneModel = (planeModel, model, result) => {
    sql.query(
      `UPDATE model SET fullName = ?, role= ?, manufacturer = ? WHERE planeModel = ${planeModel}`,
      [model.fullName, model.role, model.manufacturer],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found model with the planeModel
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated model: ", { planeModel: planeModel, ...model });
        result(null, { planeModel: planeModel, ...model });
      }
    );
  };

  module.exports = Model;