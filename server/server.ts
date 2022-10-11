const express = require("express");
const cors = require("cors");
const auth = require("./modules/auth");
const db = require("./modules/database");
const app = express();

const port = 8000;

app.listen(port);
app.use(cors());
app.use(express.static(__dirname + "/public"));
app.use(
  express.json({
    limit: "1mb",
  })
);

console.log(`Server running at http://localhost:${port}/`);
const pool = db.dbCreatePool();

app.get("/", (req, res) => {
  res.render("./public/index.html");
});

app.post("/api", async (request: any, response: any) => {
  const req = await request.body;
  log(req);

  if (req.type === "setHighScore") {
    if (req.user !== "Null") {
      console.log(
        "UserUpdateSucces: " + (await db.updateUser(pool, req.user, req.score))
      );
    }
    response.json({
      status: "Success",
      statusCode: 200,
    });
  } else if (req.type === "getHighScore") {
    let highScore;
    if (req.user !== "Null") {
      let userDB = await db.getUser(pool, req.user);
      try {
        highScore = await userDB[1].highScore;
      } catch (err) {
        console.warn(err);
        console.log("Error with user: " + req.user);
      }
    }
    response.json({
      status: "Success",
      statusCode: 200,
      highScore: highScore || 0,
    });
  } else {
    let user;
    // const pool = await db.dbCreatePool();
    const userInfo = await auth.getUserInfo(await req.code);
    log(userInfo);
    try {
      let userDB = await db.getUser(pool, userInfo.given_name);
      console.log(userDB);
      if (!userDB.length) {
        console.log(
          "addUserSucces: " + (await db.addUser(pool, userInfo.given_name))
        );
        user = { name: userInfo.given_name, highScore: 0 };
      } else {
        user = { name: userDB[0].name, highScore: userDB[0].highScore };
        console.log("user exists");
      }
    } catch (error) {
      console.log(error);
    }
    response.json({
      status: "Success",
      statusCode: 200,
      user: user,
    });
  }

  function log(msg:string) {
    if (process.argv[2] === "-v") {
      console.log("[V]: " + msg);
    }
  }
});
