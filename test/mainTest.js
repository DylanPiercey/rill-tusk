var assert      = require("assert");
var agent       = require("supertest");
var Rill        = require("rill");
var tusk        = require("tusk");
var serverViews = require("../server");

describe("Rill/Tusk", function () {
	it("should work on the server", function (done) {
		function View (props, children, locals) {
			return tusk("html", null,
				tusk("head"),
				tusk("body", null, props.hello + locals.ctx)
			);
		}

		var request = agent(
			Rill()
				.use(serverViews())
				.get("/", function (ctx, next) {
					ctx.locals["ctx"] = "locals";
					ctx.res.body = function () { return tusk(View, { hello: "world" }); };
				})
				.listen()
		);

		request
			.get("/")
			.expect(200)
			.expect(function (res) {
				console.log(res.text);
				var body = res.text.split("</body>")[0].split(">").pop();
				assert.equal(
					body,
					"worldlocals"
				);
			})
			.expect("content-type", "text/html; charset=UTF-8")
			.end(done)
	});
});

function respond (status, test) {
	return function (ctx) {
		ctx.res.status = status;
		if (typeof test === "function") test(ctx);
	};
}
