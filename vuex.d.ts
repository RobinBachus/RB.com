import { Store } from "vuex";

declare module "@vue/runtime-core" {
  interface State {
    highScore: number;
  }

  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}

declare module "vuex" {
  function useStore<T = any>(key?: string): T;
}
