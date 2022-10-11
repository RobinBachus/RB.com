import { Store } from "vuex";

declare module "@vue/runtime-core" {
  interface State {
    highScore: number;
  }

  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
