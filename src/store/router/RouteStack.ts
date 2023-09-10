import { createSlice } from "@reduxjs/toolkit";

const RouteStack = createSlice({
  name: "RouteStack",
  initialState: () => {
    const state = sessionStorage.getItem("routeStack");
    if (state) {
      return JSON.parse(state);
    }
    return {
      routeStack: ["/home"],
      showPlayControl:false,
      level:1
    };
  },

  reducers: {
    forward(state, actions) {
      state.routeStack.push(actions.payload);
      state.level+=1
      sessionStorage.setItem("routeStack", JSON.stringify(state));
    },
    back(state) {
      state.routeStack.pop();
      state.level-=1
      sessionStorage.setItem("routeStack", JSON.stringify(state));
    },
    showPlayControl(state,actions){
      state.showPlayControl=actions.payload
    }

  },
});

export const { forward, back,showPlayControl } = RouteStack.actions;

export default RouteStack;
