var express = require("express");
var app = express();
var PORT = process.env.PORT || 8080; // default port 8080

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
  extended: false
}));


app.set("view engine", "ejs");


var urlDatabase = { 
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com", 
};

app.post("/urls/:id", (req, res) => {
  var nlongURL = req.body.longURL;
  urlDatabase[req.params.id] = nlongURL;
  res.redirect("/urls");
});


app.post("/urls/:id/delete", (req, res) => {
  let deleteProperty = req.params.id;
  delete urlDatabase[deleteProperty];
  res.redirect("/urls");
})


app.get("/u/:shortURL", (req, res) => {
  let shortURL = req.params.shortURL
  let longURL = urlDatabase[shortURL]
  res.redirect(longURL);

});

app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});

app.post("/urls", (req, res) => {
  console.log(req.body);  // debug statement to see POST parameters

  var string = generateRandomString()
  var longURL = req.body.longURL
  urlDatabase[string] = longURL
  console.log(urlDatabase)

  res.redirect("/urls/" + string)
});

app.get("/", (req, res) => {
  res.end("Hello!");
});

app.get("/urls", (req, res) => {
  let templateVars = { urls: urlDatabase };
  res.render("urls_index.ejs", templateVars);
});

app.get("/urls/:id", (req, res) => {
  let templateVars = { shortURL: req.params.id };

  console.log(templateVars);
  res.render("urls_show.ejs", templateVars);
});

app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

app.get("/hello", (req, res) => {
  res.end("<html><body>Hello <b>World</b></body></html>\n");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});


function generateRandomString() {

var stringLength = 6
var alphaLetter = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","1","2","3","4","5","6","7","8","9","0"]
var randomString = ""
 
  for (var i = 0; i < stringLength; i++) {
    min = 0
    max = alphaLetter.length - 1

    var ranIndex = Math.floor(Math.random() * (max - min + 1)) + min;
    var ranValue = alphaLetter[ranIndex]

    randomString += ranValue 
  }

  return randomString

}

//console.log(generateRandomString())




