import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	platforms: [],
	sort: { method: "-released", option: "Newest" },
	platformIds: [],
};

const discoverSlice = createSlice({
	name: "discover",
	initialState,
	reducers: {
		setSortMethod: (state, action) => {
			state.sort = action.payload;
		},
		setPlatformIds: (state, action) => {
			const id = action.payload;
			if (state.platformIds.includes(id)) {
				state.platformIds = state.platformIds.filter((el) => el !== id);
			} else {
				state.platformIds.push(id);
			}
		},
		setFilters: (state, action) => {
			const { name, filters } = action.payload;
			state[name] = filters;
		},
		clearPlatformIds: (state) => {
			state.platformIds = [];
		},
		clearSort: (state) => {
			state.sort = "";
		},
	},
});

export const { setSortMethod, setPlatformIds, setFilters, clearPlatformIds, clearSort } = discoverSlice.actions;

const discoverSliceReducer = discoverSlice.reducer;
export default discoverSliceReducer;
