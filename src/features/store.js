import { configureStore } from "@reduxjs/toolkit";
import discoverSliceReducer from "./discoverSlice/discoverSlice";
import gamesSliceReducer from "./gamesSlice/gamesSlice";
import searchSliceReducer from "./searchSlice/searchSlice";

const store = configureStore({
	reducer: {
		search: searchSliceReducer,
		discover: discoverSliceReducer,
		games: gamesSliceReducer,
	},
});

export default store;
