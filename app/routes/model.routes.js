module.exports = app => {
    const models = require("../controllers/model.controller.js");
  
    //Create a new Model
    app.post("/ModelName", models.createModel);
  
    // Retrieve models according to planeModel
    app.get("/ModelName/planeModel/:planeModel", models.findOne);

    //Retrieve all the models
    app.get("/ModelName", models.findAll);

    // Update a model with planeModel
    app.put("/ModelName/planeModel/:planeModel", models.update);
  
    // Delete a model with planeModel
    app.delete("/ModelName/planeModel/:planeModel", models.delete);
    
  };