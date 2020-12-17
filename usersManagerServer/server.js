const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser')//

app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.io = io
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

//routes
const usersRoutes = require('./routes/users');
const adminsRoutes = require('./routes/admins');

app.use('/api/users', usersRoutes)
app.use('/api/admins', adminsRoutes)

//middleware
app.use(bodyParser.json())//


io.on('connection', function (socket) {
  console.log('a user connected');
});


http.listen(port, () => console.log(`listening on port ${port}`));



