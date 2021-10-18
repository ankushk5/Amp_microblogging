const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");

const app = express();

//body parser
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

connectDB();

app.use(cors());

// Routes
// app.use("/auth", require("./src/auth/api"));
app.use("/api/post", require("./routes/posts"));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server connected to port ${PORT}`);
});
