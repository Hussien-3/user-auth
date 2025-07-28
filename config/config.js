const mongoos = require("mongoose");

const connect = mongoos.connect(process.env.DB_URL);

connect
  .then(() => {
    console.log("database connect");
  })
  .catch((erorr) => {
    console.log("database can't connect", erorr);
  });

module.exports = connect;
