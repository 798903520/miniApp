import { defineStore } from 'pinia'
import { store } from "../index";
export const useUserStore = defineStore("user", {
  id: "index",
  state: () => {
    return {
      name: "",
    };
  },
  getters: {
    GET_NAME() {
      return this.name;
    },
  },
  actions: {
    SET_NAME(name) {
      this.name = name;
    },
  },
});
export function useOrderStoreWithOut() {
  return useUserStore(store);
}