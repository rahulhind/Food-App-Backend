const planModel = require("../models/planModels");

module.exports.getAllPlans = async function getAllPlans(req, res) {
  try {
    let plans = await planModel.find();
    if (plans) {
      return res.json({
        message: "All plans retrieved",
        data: plans,
      });
    } else {
      return res.json({
        message: "No plans available",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.getPlans = async function getPlans(req, res) {
  try {
    let id = req.params.id;
    let plan = await planModel.findById(id);
    if (plan) {
      return res.json({
        message: "Plan retrieved",
        data: plan,
      });
    } else {
      return res.json({
        message: "Plan not found or Enter Plan Id correctly",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.deletePlans = async function deletePlans(req, res) {
  try {
    let id = req.params.id;
    let deletedData = await planModel.findByIdAndDelete(id);

    return res.json({
      message: "Deleted Successfully",
      data: deletedData,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.createPlans = async function createPlans(req, res) {
  try {
    let planData = req.body;
    let createdPlan = await planModel.create(planData);
    return res.json({
      message: "Successfully created",
      data: createdPlan,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.updatePlans = async function updatePlans(req, res) {
  try {
    let id = req.params.id;
    let dataToBeUpdated = req.body;
      let plan = await planModel.findById(id);
    //  console.log(plan);
      if (plan) {
          let keys = [];
          for (let key in dataToBeUpdated) {
              keys.push(key);
          }
          for (let i = 0; i < keys.length; i++) {
              plan[keys[i]] = dataToBeUpdated[keys[i]];
          }
          await plan.save();
          return res.json({
              message: "Plan Updated Successfully",
              data: plan,
          });
      } else {
          return res.json({
              message:"Plan Id Incorrect"
          })
      }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.top3plans = async function top3plans(req, res) {
  try {
    //Limit will return 3 objects and sort:-1 will sort in descending order
    const topPlans = await planModel
      .find()
      .sort({ ratingAverage: -1 })
      .limit(3);
    return res.json({
      message: "Top 3 plans",
      data: topPlans,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
