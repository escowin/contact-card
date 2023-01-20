// dependencies
const express = require('express');

// server setup
const app = express();
const PORT = process.env.PORT || 3001;

// express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('../client/dist/')); // allows server routes to access static client side

// testing server ability to get client side index.html
require('./routes/htmlRoutes')(app);

app.listen(PORT, function() {
    console.log(`listening on http://localhost:${PORT}`);
});