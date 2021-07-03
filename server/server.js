var express = require("express");
var request = require("request");
const InitiateMongoServer = require("./db");
InitiateMongoServer();
const jwt = require("jsonwebtoken");
const User = require("./User");
var app = express();
var cors = require("cors");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 3000;

app.post("/login-auth", async (req, res) => {
  userId = req.body.userId;
  try {
    let user = await User.findOne({
      userId
    });
    if (!user)
      return res.status(400).json({
        message: "User Not Exist"
      });
    console.log(user);
    const payload = {
      user: {
        id: user.id
      }
    };
    user.loggedInAt = Date.now();
    user.save();
    jwt.sign(
      payload,
      "usedId",
      {
        expiresIn: 3600
      },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          token
        });
      }
    );
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "Server Error"
    });
  }
});

app.post("/compile", (req, res) => {
  var bodyObj = JSON.parse(JSON.stringify(req.body));
  let code = bodyObj.code.toString();
  let language = bodyObj.language.toString();
  let inputs = bodyObj.standardIn.toString();
  var program = {
    script: code,
    language: language,
    stdin: inputs,
    versionIndex: "0",
    clientId: "2ea10035502b52f6245257edb062ce91",
    clientSecret:
      "4c1051b90bd45d5b027f2a0956393bf34d396addb7bc47897f1dc65e72ceee3d"
  };
  request(
    {
      url: "https://api.jdoodle.com/v1/execute",
      method: "POST",
      json: program
    },
    function (error, response, body) {
      console.log("error:", error);
      console.log("statusCode:", response && response.statusCode);
      console.log("body:", body);
      res.json(body);
    }
  );
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
