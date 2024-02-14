import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: StateType = {
  loading: false,
  result: [],
  words: [],
  error: "",
};

const rootSlice = createSlice({
  name: "root",
  initialState: initialState,
  reducers: {
    getWordsReq: (state) => {
      state.loading = true;
    },
    getWordsSuccess: (state, action: PayloadAction<WordType[]>) => {
      state.loading = false;
      state.words = action.payload;
    },
    getWordsFail: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = JSON.stringify(action.payload);
    },

    saveResult: (state, action: PayloadAction<string[]>) => {
      state.loading = false;
      state.result = action.payload;
    },
    cleareState: (state) => {
      state.loading = false;
      state.result = [];
      state.words = [];
      state.error = "";
    },
  },
});

export const {
  getWordsReq,
  getWordsFail,
  getWordsSuccess,
  saveResult,
  cleareState,
} = rootSlice.actions;

export const rootReducer = rootSlice.reducer;
