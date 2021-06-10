import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import trackerReducer from "./trackerSlice";

const saveLocal = (state) => {
  try {
    const stateSave = JSON.stringify(state);
    localStorage.setItem('state', stateSave);
  } catch (e) {
    console.log(e);
  }
}

const loadLocal = () => {
  try {
    const stateLoad = localStorage.getItem('state');
    if (stateLoad === null) return undefined;
    return JSON.parse(stateLoad)
  } catch (e) {
    return undefined;
  }
}

const rootReducer = {
  user: userReducer,
  tracker: trackerReducer,
}

const store = configureStore({
  reducer: rootReducer,
  // preloadedState: {
  //   reducerName?: loadLocal()
  // }
})

// store.subscribe(() => {
//   saveLocal({
//     reducerName?: store.getState()
//   })
// })

export default store;
