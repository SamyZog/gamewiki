import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	results: [],
	status: null,
};

const searchSlice = createSlice({
	name: "search",
	initialState,
	reducers: {
		addSearchResults: (state, action) => {
			const { error, data } = action.payload;
			if (data) {
				state.results = data.results;
				state.status = "fulfilled";
			}
			if (!data) state.status = "pending";
			if (error) state.status = "error";
		},
		clearSearchResults: (state) => initialState,
	},
});

export const { addSearchResults, clearSearchResults } = searchSlice.actions;

export const selectStatus = (state) => state.search.status;
export const selectSearchData = (state) => state.search.results;

const searchSliceReducer = searchSlice.reducer;
export default searchSliceReducer;
