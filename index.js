const keep_alive = require('./keep_alive.js')
const MainClient = require("./nanospace");
const client = new MainClient();

client.connect()

module.exports = client; 