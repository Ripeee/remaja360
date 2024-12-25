import { createServer } from "http";
import { parse } from "url";
import next from "next";

const dev: boolean = process.env.NODE_ENV !== "production";
const hostname: string = "localhost";
const port: number = parseInt(process.env.PORT || "8080", 10);

// Initialize Next.js application
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
	const server = createServer(async (req, res) => {
		try {
			if (!req || !res) {
				throw new Error("Invalid request or response object");
			}

			// Parse the URL to extract pathname and query
			const parsedUrl = parse(req.url || "", true);
			const { pathname, query } = parsedUrl;

			if (pathname === "/a") {
				await app.render(req, res, "/a", query);
			} else if (pathname === "/b") {
				await app.render(req, res, "/b", query);
			} else {
				await handle(req, res, parsedUrl);
			}
		} catch (err) {
			console.error("Error occurred handling", req?.url, err);
			if (res) {
				res.statusCode = 500;
				res.end("Internal Server Error");
			}
		}
	});

	// Start the server
	server.listen(port, hostname, () => {
		console.log(`> Ready on http://${hostname}:${port}`);
	});

	server.on("error", (err) => {
		console.error("Server error:", err);
	});
});
