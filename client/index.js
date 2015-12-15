var tusk     = require("tusk");
var statuses = require("statuses");

module.exports = function (opts) {
	return function renderTusk (ctx, next) {
		return next().then(function () {
			var res = ctx.res;
			if (
				typeof res.body !== "function" ||
				statuses.redirect[res.status] ||
				statuses.empty[res.status] ||
				res.get("Location")
			) return;

			try {
				tusk.render(document, tusk.with(ctx.locals, res.body));
			} catch (err) {
				res.body = undefined;
				throw err;
			}
		});
	};
};
