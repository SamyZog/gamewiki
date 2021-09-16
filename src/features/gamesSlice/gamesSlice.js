import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	games: [],
	status: null,
	nextUrl: "",
};

const gamesSlice = createSlice({
	name: "games",
	initialState,
	reducers: {
		addGames: (state, action) => {
			const { results, next } = action.payload;

			console.log(results);

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

export const { addGames, getGames } = gamesSlice.actions;

const gamesSliceReducer = gamesSlice.reducer;
export default gamesSliceReducer;

export const selectGames = (state) => state.games.games;
export const selectNextUrl = (state) => state.games.nextUrl;
