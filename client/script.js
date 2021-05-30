async function compileIt() {
  document.getElementById("opscreen").style.visibility = "visible";
  var response = await fetch("https://codeorbored.herokuapp.com", {
    method: "POST",
    headers: {
      "Content-Type": "text/plain"
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
