import { createSlice } from "@reduxjs/toolkit";

const RouteStack = createSlice({
  name: "RouteStack",
  initialState: () => {
    const state = sessionStorage.getItem("routeStack");
    if (state) {
      return JSON.parse(state);
    }
    return {
      routeStack: ["/"],
      showPlayControl:false
    };
  },

  reducers: {
    forward(state, actions) {
      state.routeStack.push(actions.payload);
      sessionStorage.setItem("routeStack", JSON.stringify(state));
    },
    back(state) {
      state.routeStack.pop();
      sessionStorage.setItem("routeStack", JSON.stringify(state));
    },
    showPlayControl(state,actions){
      state.showPlayControl=actions.payload
    }

  },
});

export const { forward, back,showPlayControl } = RouteStack.actions;

export default RouteStack;
