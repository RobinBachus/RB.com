import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      score: 0,
      highScore: 0,
    };
  },
  mutations: {
    increment(state: { score: number }) {
      state.score++;
    },
    setHighScore(state: { highScore: number }, value: number) {
      state.highScore = value;
    },
  },
});

export default store;
