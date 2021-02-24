import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import vechileGraphReducer from "../features/vechileGraph/vechileGraphSlice";
import graphTwoReducer from "../features/graphTwo/graphTwoSlice";
import graphThreeReducer from "../features/graphThree/graphThreeSlice";
import graphFourReducer from "../features/graphFour/graphFourSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    vechileGraph: vechileGraphReducer,
    graphTwo: graphTwoReducer,
    graphThree: graphThreeReducer,
    graphFour: graphFourReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
    immutableCheck: false,
  }),
});
