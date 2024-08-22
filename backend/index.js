import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import postLikeRoutes from "./routes/postLikeRoutes.js";
import organisationRoutes from "./routes/organisationRoutes.js";
import postOrganisationRoutes from "./routes/postOrganisationRoutes.js";
import postReachRoutes from "./routes/postReachRoutes.js";
import { spawn } from "child_process";
import User from "./models/userModel.js";
import fs from "fs";

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 6000;

connectDB();

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/postlikes", postLikeRoutes);
app.use("/api/organisations", organisationRoutes);
app.use("/api/postorganisation", postOrganisationRoutes);
app.use("/api/reach", postReachRoutes);

app.post("/api/scrapperEngine", (req, res) => {
  const { handle, user } = req.body;
  console.log("pybjh: ", req.body);

  let output = "";
  const childPython = spawn("python3", ["zinsta/extra.py", handle]);

  childPython.stdout.on("data", (data) => {
    output += data.toString();
    console.log(output);
  });

  childPython.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  childPython.on("close", (code) => {
    console.log(`child process exited with code ${code}`);

    fs.readFile("instagram_data.json", async function (err, data) {
      if (err) throw err;

      const reqData = JSON.parse(data);
      const insta_followers = reqData[0].followers;
      const insta_score = reqData[0].result;
      console.log("insta_followes: ", insta_followers);
      console.log("score: ", insta_score);

      const userupdated = await User.findByIdAndUpdate(user.id, { instaFollowers: insta_followers, instaScore: insta_score });
    });

    res.send("simulation completed");
  });
});

app.post("/api/instadetails", (req, res) => {
  const user = req.body;
  const resp = User.findById(user.id);
  res.status(201).json({
    resp,
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
