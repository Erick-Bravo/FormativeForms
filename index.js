const express = require("express");
const csrf = require("csurf");
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT || 3000;
const csrfProtection = csrf( { cookie: true} )
app.use(cookieParser());

app.use(express.urlencoded( { extended: true }))


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
	res.render("create-user", {
    title: "Create User",
    csrfToken: req.csrfToken()
	})
});

const validateUser = (req, res, next) => {
	const { firstName, lastName, email, password } = req.body
	const errors = [];

	if(!firstName) {
		errors.push("Please provide a first name.")
	}
	if(!lastName) {
		errors.push("Please provide a last name.")
	}
	if(!email) {
		errors.push("Please provide an email.")
	}
	if(!password) {
		errors.push("Please provide a password.")
	}
	req.errors = errors
	next()
}

app.post('/create', csrfProtection, validateUser, (req, res) => {
	const { id, firstName, lastName, email, password } = req.body
	if (req.errors.length > 0) {
    res.render("create-user", { csrfToken: req.csrfToken(), id, firstName, lastName, email, password, errors: req.errors })
  }
  else{
    res.redirect("/")
  }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;
