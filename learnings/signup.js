const express = require("express");
const app = express();
//HTTP Methods:
//HTTP method names are verb types eg:get,push,put
//REST API names should be Noun type in name
//Get means sending Data to front-end
//Post means receving data from front-end
//Patch means updating

//Data coming from frontend to backend is stored in req.body

app.use(express.json()); //middleware func->pos,front->json

let users = [
  {
    id: 1,
    name: "Rahul",
  },
  {
    id: 2,
    name: "Sahil",
  },
  {
    id: 3,
    name: "Pawan",
  },
  {
    id: 4,
    name: "Asparsh",
  },
  {
    id: 5,
    name: "Dhiraj",
  },
  {
    id: 6,
    name: "Taylor Swift",
  },
];
// const authRouter = express.Router();
// app.post("/auth/signup", (req, res) => {
//  let obj = req.body;
//   console.log("backend ", obj);
//   res.json({
//     message: "User Signed Up",
//     data: obj,
//   });
// })
// app.get("/auth/signup", (req, res) => {
//   res.sendFile("/public/index.html", { root: __dirname });
// })
app.use("/auth", authRouter);
authRouter.route("/signup").get(middleware,getSignup).post(postSignup);
function middleware(req, res, next) {
  console.log('middleware encountered');
  next();
}
function getSignup(req, res) {
  //res.send("Hello");
  res.sendFile("/public/index.html", { root: __dirname });
}
function postSignup(req, res) {
  let obj = req.body;
  console.log("backend ", obj);
  res.json({
    message: "User Signed Up",
    data: obj,
  });
}

const userRouter = express.Router();
//mini app
app.use("/user", userRouter);
userRouter
  .route("/")
  .get(getUser)
  .post(postUser)
  .patch(updateUser)
  .delete(deleteUser);

userRouter.route("/:id").get(getUserById);

function getUserById(req, res) {
  console.log(req.param.id);
  let paramId = req.param.id;
  let obj = {};
  for (let i = 0; i < users.length; i++) {
    if (users[i]["id"] == paramId) {
      obj = users[i];
    }
  }
  res.json({
    message: "Req recevied ",
    data: obj,
  });
}
function deleteUser(req, res) {
  users = {};
  res.json({
    message: "Deleted Sucessfully",
    user: users,
  });
}
function updateUser(req, res) {
  console.log("res.body-> ", req.body);
  let updatedData = req.body;

  for (let i = 0; i < users.length; i++) {
    //console.log(key);
    if (users[i][key] == updated) {
      users[i] = updatedData;
    }
  }
  res.json({
    message: "Updated Sucessfully",
    user: users,
  });
}
function getUser(req, res) {
  res.send(users);
}
function postUser(req, res) {
  console.log(req.body);
  users = req.body;
  //res.json or res.send is similar it only converts response to JSON file
  res.json({
    message: "Data recevied",
    user: req.body,
  });
}

app.listen(3000, () => {
  console.log("Running");
});
