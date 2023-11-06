const userModel = require("../models/userModel");

module.exports.getUser = async function getUser(req, res) {
  try {
    let id = req.id;
    // console.log("Hello");
    // console.log(req.id);
    let users = await userModel.findById(id);
    if (users) {
      return res.json(users);
    } else {
      return res.json({
        message: "User not found",
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

module.exports.getAlluser = async function getAlluser(req, res) {
  try {
    let users = await userModel.find();
    if (users) {
      res.json({
        message: "Users found",
        data: users,
      });
    } else {
      res.json({
        message: "No users",
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};
module.exports.updateUser = async function updateUser(req, res) {
  try {
    let id = req.params.id;
    let dataToBeUpdated = req.body;
    let user = await userModel.findById(id);

    if (user) {
      // Exclude "confirmPassword" field from the data to be updated
    //  delete dataToBeUpdated.confirmPassword;

      // Update the user data with the remaining fields
      //console.log("Data to be Updated-> ", dataToBeUpdated);
      
      for (let key in dataToBeUpdated) {
        //console.log("Key is-> ", key);
        user[key] = dataToBeUpdated[key];
      }

      const updatedUser = await user.save();

      res.json({
        message: "User updated successfully",
        data: updatedUser
      });
    } else {
      res.json({
        message: "User not found",
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

// module.exports.updateUser = async function updateUser(req, res) {
//   try {
//     let id = req.params.id;
//     let dataToBeUpdated = req.body;
//     let user = await userModel.findById(id);
//     //console.log("ID->",id);
//  // console.log(user);
//     if (user) {
//       const keys = [];
//       for (let key in dataToBeUpdated) {
//         keys.push(key);
//       }
//      // console.log(keys);
//       for (let i = 0; i < keys.length; i++) {
//         user[keys[i]] = dataToBeUpdated[keys[i]];
//       }

//       const updatedUser = await user.save();
//       // const dbSave = new userModel(user);
//       // await dbSave.save();
//       res.json({
//         message: "User updated successfully",
//         data:user
//       });
//     } else {
//       res.json({
//         message: "User not found",
//       });
//     }
//   } catch (err) {
//     res.json({
//       message: err.message,
//     });
//   }
// };
module.exports.deleteUser = async function deleteUser(req, res) {
  try {
    let id = req.params.id;
    let del = await userModel.findByIdAndDelete(id);
    if (!del) {
      res.json({
        message: "User not found",
      });
    }
    res.json({
      message: "Deleted",
      data: del,
    });
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

module.exports.uploadProfileImage = async function uploadProfileImage(req, res) {
res.json({message:"Upload Successful"})
}