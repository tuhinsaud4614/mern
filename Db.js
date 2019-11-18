require("dotenv").config();
const mongoose = require("mongoose");

module.exports = mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Database connected"))
  .catch(err => console.log(`Database connection failed & the err is ${err}`));

// mongoose.connection.once("open", () => {
//     console.log("Database connected");
// }).on("error", (err) => {
//     console.log(`Database connection failed & the err is ${err}`);
// });
