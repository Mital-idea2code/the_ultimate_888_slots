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

io.on("connection", function (socket) {
  console.log("connected");
  socket.on("addEditAds", function (data) {
    console.log("data", data);
    io.sockets.emit("getAddEditAds", data);
  });
  
  socket.on("activedeactiveAds", function (data) {
    console.log("data", data);
    io.sockets.emit("getActiveDeactiveAds", data);
  });
  
  socket.on("deleteAds", function (data) {
    console.log("data", data);
    io.sockets.emit("getdeleteAds", data);
  });
  
});

var port = process.env.PORT || 8000;
http.listen(port, function () {
  console.log(`listening on *:8000`);
});
