const express = require("express");
const app = express();
const { taskRoutes, userRoutes, emailRoutes } = require("./routes");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

var whitelist = ["http://localhost:3000", "https://todona.surawit.com"];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback("Not allowed by CORS");
    }
  },
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

mongoose
  .connect(process.env.DATABASE, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("✔ Database connected");
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/api", taskRoutes);

app.use("/api", userRoutes);

app.use("/api", emailRoutes);

app.listen(process.env.PORT || 1000, () => {
  console.log(`✨ Server Start at Port : ${process.env.PORT}`);
});

// localhost:1000 --> Web server
// localhost:27017 --> MongoDB server
