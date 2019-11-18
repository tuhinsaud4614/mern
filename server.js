require("dotenv").config();
require("./Db");
const express = require("express");

const usersRoutes = require("./routes/api/users");
const profileRoutes = require("./routes/api/profile");
const postsRoutes = require("./routes/api/posts");

const app = express();

// Use Routes
app.use("/api/users", usersRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/profile", profileRoutes);

const host = process.env.HOST || localhost;
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server running on ${host}:${port}`));
