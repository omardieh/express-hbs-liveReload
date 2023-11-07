const express = require("express");
const path = require("path");
const colors = require("colors");
const livereload = require("livereload");
const connectLivereload = require("connect-livereload");

const app = express();

colors.setTheme({
  silly: "rainbow",
  input: "grey",
  verbose: "cyan",
  prompt: "grey",
  info: "inverse",
  data: "grey",
  help: "cyan",
  warn: "yellow",
  debug: "blue",
  error: "red",
});

// refresh browser :
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname));
// liveReloadServer.server.once("connection", () => {
//   setTimeout(() => {
//     liveReloadServer.refresh("/");
//   }, 100);
// });
app.use(connectLivereload());

// logger :
app.use((req, res, next) => {
  console.info(`method: ${req.method} | url: ${req.url}`.verbose);
  next();
});

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.get("/", (req, res) => {
  res.render("index", { mainTitle: "Hello World" });
});

app.listen(process.env.port || 3000, () => {
  console.info(`App is running on port: ${process.env.port || 3000}`.info);
});
