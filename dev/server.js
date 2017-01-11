import path from "path";
import express from "express";

const port = process.env.NODE_PORT || 3000;
const host = process.env.NODE_HOST || "127.0.0.1";

const app = express();

app.get("/", (req, res) => res.sendFile("index.html", {
	root : path.join(__dirname, "..", "src")
}));

app.use(express.static('gh-pages'));
app.use(express.static('src'));

app.listen(port, host);
