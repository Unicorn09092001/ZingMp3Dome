import { createSlice } from "@reduxjs/toolkit";

const artistPageDataSlice = createSlice({
  name: "artistPageData",
  initialState: {
    alias: "",
    sections: [],
  },
  reducers: {
    setArtistAlias: (state, action) => {
      state.alias = action.payload;
    },
    setArtistSection: (state, action) => {
      state.sections = action.payload;
    },
  },
});

const {
  actions: { setArtistAlias, setArtistSection },
  reducer,
} = artistPageDataSlice;

export { setArtistAlias, setArtistSection };

export default reducer;
