<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      score: 0,
    };
  },

  methods: {
    async add() {
      this.score += 1;
      this.increment();
      console.log(this.getScore());
      if (this.score > this.highScore) {
        let user = document.getElementById("login-btn-text")!.innerHTML;
        if (user === "Sign In") {
          user = "Null";
        }
        console.log(user);
        this.highScore = this.score;
        const response = await this.makePOSTRequest({
          type: "setHighScore",
          user,
          score: this.score,
        });
        const json = await response.json();
        console.log(await json);
      }
    },
    async makePOSTRequest(data: Record<string, unknown>) {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      console.log(data.type + " request sent, awaiting response...");
      return await fetch("http://localhost:8000/api", options);
    },
    increment() {
      this.$store.commit("increment");
    },
    getScore() {
      return this.$store.state.score;
    },
  },

  async setup() {
    const highScore = await getHighScore();

    async function makePOSTRequest(data: Record<string, unknown>) {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      console.log(data.type + " request sent, awaiting response...");
      return await fetch("http://localhost:8000/api", options);
    }

    async function getHighScore() {
      let user = document.getElementById("login-btn-text")!.innerHTML;
      if (user === "Sign In") {
        user = "Null";
      }
      const response = await makePOSTRequest({ type: "getHighScore", user });
      const json = await response.json();
      console.log(await json);
      return await json.highScore;
    }

    return { highScore };
  },

  computed: {
    highScore() {
      return this.$store.state.highScore;
    },
  },
});
</script>

<template>
  <p id="highScore" class="highScore">HIGHSCORE: {{ highScore }}</p>
  <button @click="add()" class="score">
    You clicked me {{ score }} times.
  </button>
</template>

<style scoped>
.score {
  background-color: #3f9af5;
  border-radius: 10px;
  border: 1px solid;
  height: 100%;
}

.highScore {
  padding-left: 6px;
}
</style>
