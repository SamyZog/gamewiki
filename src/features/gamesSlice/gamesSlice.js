import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	games: [],
	status: null,
	nextUrl: "",
	scrollPosition: "",
};

const gamesSlice = createSlice({
	name: "games",
	initialState,
	reducers: {
		addScrollPosition: (state, action) => {
			state.scrollPosition = action.payload;
		},
		addGames: (state, action) => {
			const { results, next } = action.payload;
			state.nextUrl = next;
			state.games.push(...results);
		},
		getGames: (state, action) => {
			const { results, next } = action.payload;
			state.nextUrl = next;
			state.games = results;
		},
	},
});

export const { addGames, getGames, addScrollPosition, setFetched } = gamesSlice.actions;

const gamesSliceReducer = gamesSlice.reducer;
export default gamesSliceReducer;

export const selectGames = (state) => state.games.games;
export const selectNextUrl = (state) => state.games.nextUrl;
export const selectScrollPosition = (state) => state.games.scrollPosition;
