# Rill Tusk
Isomorphic rendering middleware for Rill using the Tusk virtual dom.

# Installation

#### Npm
```console
npm install rill-tusk
```

# Example

```javascript
const app       = require("rill")();
const tusk      = require("tusk");
const tuskViews = require("rill-tusk");

function HelloWorld (props, children, locals) {
	// Locals will be provided as context if available.
	return (
		<html>
			<head>
				<title>My App</title>
				<meta name="description" content="Rill Application"/>
			</head>
			<body>
				{ locals.title }
				{ props.message }
				<script src="/app.js"/>
			</body>
		</html>
	);
}

app.use(tuskViews());

// Set locals in middleware.
app.use(({ locals }), next)=> {
	locals.title = "rill-tusk";
	return next();
});

app.use(({ req, res }, next)=> {
	// Just set the body to a function that will return a tusk element.
	// updates the dom in the browser, or render a string in the server.
	res.body = ()=> <HelloWorld message="Hello World"/>;

	// On the server the final response will be.
	`
		<!DOCTYPE html>
		<html>
			<head>
				<title>My App</title>
				<meta name="description" content="Rill Application">
			</head>
			<body>
				rill-tusk
				Hello World
				<script src="/app.js"></script>
			</body>
		</html>
	`
});
```

### Contributions

* Use gulp to run tests.

Please feel free to create a PR!
