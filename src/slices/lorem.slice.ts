import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ILoremState } from "../types/state.model";
const initialState: ILoremState = {
  data: {},
  status: {},
  error: {},
};

const apiUrl = process.env.REACT_APP_API_URL;

export const fetchLorem = createAsyncThunk(
  "lorem/fetchLorem",
  async (tab: string, { getState }) => {
    const url = `${apiUrl}/api/${tab}/short/headers`;
    const state = getState() as RootState;

    if (state.lorem.data[tab]) {
      return { tab, data: state.lorem.data[tab] };
    }

    const response = await fetch(`${url}/${tab}`);
    const data = await response.text();
    return { tab, data };
  }
);

const loremSlice = createSlice({
  name: "lorem",
  initialState,
  reducers: {
    clearCache: (state, action: PayloadAction<string>) => {
      delete state.data[action.payload];
      state.status[action.payload] = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLorem.pending, (state, action) => {
        state.status[action.meta.arg] = "loading";
      })
      .addCase(
        fetchLorem.fulfilled,
        (state, action: PayloadAction<{ tab: string; data: string }>) => {
          state.status[action.payload.tab] = "succeeded";
          state.data[action.payload.tab] = action.payload.data;
        }
      )
      .addCase(fetchLorem.rejected, (state, action) => {
        state.status[action.meta.arg] = "failed";
        state.error[action.meta.arg] =
          action.error.message || "Failed to fetch data";
      });
  },
});

export const { clearCache } = loremSlice.actions;

export default loremSlice.reducer;
