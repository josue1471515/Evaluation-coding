  
const express = require('express');
const app = express();
var cors = require('cors')

app.use(cors())

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(express.json());
// Routes
app.use('/user', require('./routes/users.js'));
app.use('/category', require('./routes/categories.js'));
app.use('/course', require('./routes/courses.js'));

// Starting the server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});

app.get('/routes', (req, res) => {
  res.send(app._router.stack
    .filter(r => r.route)
    .map(r => Object.keys(r.route.methods)[0].toUpperCase().padEnd(7) + r.route.path)
    .join("\n"))
})