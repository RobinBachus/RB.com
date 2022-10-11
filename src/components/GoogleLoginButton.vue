<script setup lang="ts">
import type { CallbackTypes } from "vue3-google-login";
import { useStore } from "vuex";

const store = useStore();

// Get and authorise Oauth2 Authorisation code
// --> https://yobaji.github.io/vue3-google-login/#coderesponsecallback
const callback: CallbackTypes.CodeResponseCallback = async (response) => {
  console.log("Authorisation code", response.code);
  const user = await makePOSTRequest({ code: response.code });
  const userData = await user.json();
  console.log(userData);
  document.getElementById("login-btn-text")!.innerHTML = userData.user.name;
  setHighScore(userData.user.highScore);
};

const makePOSTRequest = async (data: Record<string, unknown>) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  console.log(data.type + " request sent, awaiting response...");
  return await fetch("http://localhost:8000/api", options);
};

const setHighScore = (value: number) => store.commit("setHighScore", value);
</script>

<template>
  <GoogleLogin :callback="callback" id="google-login" class="nav-button">
    <button id="login-btn">
      <span id="login-btn-text" class="text">Sign In</span>
    </button>
  </GoogleLogin>
</template>

<script lang="ts">
export default {
  name: "GoogleLoginButton",
};
</script>

<style scoped>
/* credit for button css: https://getcssscan.com/css-buttons-examples -> btn by Greenlight */
#login-btn {
  align-items: center;
  background-image: linear-gradient(144deg, #af40ff, #5b42f3 50%, #00ddeb);
  border: 0;
  border-radius: 8px;
  box-shadow: rgba(151, 65, 252, 0.2) 0 15px 30px -5px;
  box-sizing: border-box;
  color: #ffffff;
  display: flex;
  font-family: Phantomsans, sans-serif;
  font-size: 20px;
  justify-content: center;
  line-height: 1em;
  max-width: 100%;
  min-width: 140px;
  padding: 3px;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  cursor: pointer;
}

#login-btn:active,
#login-btn:hover {
  outline: 0;
}

#login-btn span {
  background-color: rgb(5, 6, 45);
  padding: 4px 24px;
  border-radius: 6px;
  width: 100%;
  height: 100%;
  transition: 300ms;
}

#login-btn:hover span {
  background: none;
}

#google-login {
  grid-area: login;
  padding: 0;
  margin: 7px 10px 6px;
}
</style>
