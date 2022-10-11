<template>
  <div id="navigation-menu-wrapper">
    <a
      href="https://www.robinbachus.com"
      target="_blank"
      title="Parent Website"
      id="logo-link"
    >
      <img src="../assets/logo-NoBG.png" alt="logo" id="logo" class="logo" />
    </a>
    <nav id="navigation-menu">
      <router-link to="/" id="home-button" class="nav-button">Home</router-link>
      <router-link to="/about" id="about-button" class="nav-button"
        >About</router-link
      >
      <router-link to="/contact" id="contact-button" class="nav-button"
        >Contact</router-link
      >
    </nav>
    <GoogleLoginButton></GoogleLoginButton>
  </div>
</template>

<script>
import GoogleLoginButton from "@/components/GoogleLoginButton.vue";

export default {
  name: "NavigationMenu",
  components: { GoogleLoginButton },
};
</script>

<style>
#navigation-menu-wrapper {
  display: grid;
  grid: 50px / auto auto auto;
  grid-template-areas: "logo nav login";
  grid-template-columns: fit-content(300px) 1fr fit-content(300px);
  justify-items: center;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 0;
  height: 50px;
  border-bottom: 2px solid #3f9af5;
  margin-top: 0;
}

#navigation-menu {
  grid-area: nav;
}

.logo {
  grid-area: logo;
  top: 0;
  left: 0;
  padding-bottom: 4px;
  height: 51px;
  width: auto;
}

#logo-link {
  padding-right: 3px;
}

#logo-link:hover {
  background-color: #101010;
  transition: background-color, color 0.4s;
}

.nav-button {
  display: inline-block;
  text-align: center;
  font-family: OCR_Regular, sans-serif;
  background-color: transparent;
  color: #f8c047;
  border: 1px;
  font-size: large;
  margin: 0;
  padding: 10px 25px 9px;
  size: 100px;
  /*transition: color 0.3s;*/
}

.nav-button:hover {
  color: #d07022;
  background-color: #101010;
  /*transition: background-color, color 0.2s;*/
}

@font-face {
  font-family: OCR_Regular;
  src: url(../assets/Fonts/OCR_A_Std_Regular.ttf);
}
</style>
