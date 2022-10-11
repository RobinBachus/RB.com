import * as dotenv from "dotenv";
import { OAuth2Client } from "google-auth-library";

dotenv.config({ path: __dirname + "./../.env" });

// This code vallidates an OAuth2 authorization code

const client = new OAuth2Client({
  clientId: process.env.CLIENTID,
  clientSecret: process.env.CLIENTSECRET,
  redirectUri: "http://localhost:5173",
});

// Call this function to validate OAuth2 authorization code sent from client-side
async function verifyCode(code:string) {
  const { tokens } = await client.getToken(code);
  client.setCredentials({ access_token: tokens.access_token });
  const userinfo = await client.request({
    url: "https://www.googleapis.com/oauth2/v3/userinfo",
  });
  return userinfo.data;
}

function getUserInfo(code: string) {
  let user = verifyCode(code).catch((error) => {
    // validation failed and userinfo was not obtained
    console.log(error);
  });
  return user;
}

module.exports = { getUserInfo };
