const express = require("express");
const csrf = require("csurf");
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT || 3000;
const csrfProtection = csrf( { cookie: true} )
app.use(cookieParser());
//set cookie true and other requirements
app.use(express.urlencoded())


app.set("view engine", "pug");

const users = [
	{
		id: 1,
		firstName: "Jill",
		lastName: "Jack",
		email: "jill.jack@gmail.com",
	},
];

app.get("/", (req, res) => {
	res.render("index", { users });
});

app.get("/create", csrfProtection, (req, res) => {
  console.log(req.csrfToken.toString())
	res.render("create-user", {
		key: "Create User"
	})
});

app.post('/create',)

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;
