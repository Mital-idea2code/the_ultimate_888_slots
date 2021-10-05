const app = require("express")();
const http = require("http").Server(app);
var cors = require("cors");
app.use(cors());

// Add headers before the routes are defined
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Pass to next layer of middleware
  next();
});

app.use("/testapi", (req, res) => {
  res.send("I am call");
});

const io = require("socket.io")(http, {
  allowEIO3: true,
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});


var port = process.env.PORT || 8000;
http.listen(port, function () {
  console.log(`listening on *:8000`);
});
