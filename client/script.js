async function compileIt() {
  document.getElementById("opscreen").style.visibility = "visible";
  var response = await fetch("http://127.0.0.1:3000", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      code: document.querySelector(".CodeMirror").CodeMirror.getValue(),
      language: document.querySelector("#language").value,
      standardIn: document
        .querySelector("#stdin")
        .value.split(/[|]+/)
        .join("\n")
    })
  })
    .then(response => {
      console.log(response);
      return response.json();
    })
    .then(data => {
      document.querySelector("#output").innerHTML = data.output;
    })
    .catch(error => alert(error.message));
}

document.querySelector("#compile").addEventListener("click", e => {
  compileIt();
});
