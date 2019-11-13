var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser')

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.post('/login', function(req, res) {
  console.log(req.body);
  if (
    req.body.username === "admin" &&
    req.body.password === "pass"
  ) {
    res.status(200).send({
      success: true
    });
  } else {
    res.status(403).send({
      success: false,
      message: "Unauthorized"
    });
  }

});

let messagesHistory = [];

io.on('connection', function(socket) {
  console.log('a user connected');

  socket.on('disconnect', function() {
    console.log('user disconnected');
  });

  socket.on('chat message', function(msg) {
    console.log('received chat message: ', msg);
    io.emit('chat message', msg);
    messagesHistory.push({ text: msg });
  });
});

app.get("/history", function(req, res) {
  res.send(messagesHistory);
});

http.listen(3000, "localhost", function() {
  console.log('listening on *:3000');
});
