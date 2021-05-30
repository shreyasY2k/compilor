var express = require("express");
var request = require("request");

var app = express();
const port = process.env.PORT || 3000;
app.post("/", (req, res) => {
  res.set({
    "Access-Control-Allow-Origin": "https://compilor.study",
    "Access-Control-Allow-Header": "*",
    "Content-Type": "application/json",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  });
  let codeBody = [];
  req
    .on("data", chunk => {
      codeBody.push(chunk);
    })
    .on("end", () => {
      codeBody = Buffer.concat(codeBody).toString();
      bodyObj = JSON.parse(codeBody);
      console.log(bodyObj);
      let code = bodyObj.code.toString();
      let language = bodyObj.language.toString();
      let inputs = bodyObj.standardIn.toString();
      var program = {
        script: code,
        language: language,
        stdin: inputs,
        versionIndex: "0",
        clientId: "MyCLientID",
        clientSecret:
          "MyCLientSecret"
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
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
