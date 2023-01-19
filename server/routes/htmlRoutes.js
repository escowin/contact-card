// node dependency
const path = require('path');

module.exports = function(app) {
    app.get('/', function(req, res) {
        // cd into the client side to show index.html
        res.sendFile(path.join(__dirname, '../../client/index.html'));
    });
};