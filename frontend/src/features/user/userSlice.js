import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: "idle", //'idle' | 'pending' | 'succeeded' | 'failed',
  error: null,
};

const addUserFromCookie = createAsyncThunk(
  "user/addUser",
  async function (_, { rejectWithValue }) {
    try {
      const res = await fetch("http://localhost:4000/api/v1/user/", {
        credentials: "include",
      });
      if (!res.ok) {
        const data = await res.json();
        return rejectWithValue(data.message);
      }
      const data = await res.json();
      return data.data.user;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(addUserFromCookie.fulfilled, function (state, action) {
        state.user = action.payload;
        state.loading = "succeeded";
        state.isAuthenticated = true;
      })
      .addCase(addUserFromCookie.pending, function (state) {
        state.loading = "pending";
      })
      .addCase(addUserFromCookie.rejected, function (state, action) {
        state.loading = "failed";
        state.error = action.payload;
        state.isAuthenticated = false;
      });
  },
});

const selectAuth = (state) => state.user;

const selectUser = createSelector([selectAuth], (user) => user.user);
const selectIsAuthenticated = createSelector(
  [selectAuth],
  (user) => user.isAuthenticated
);
const selectLoading = createSelector([selectAuth], (user) => user.loading);

export { addUserFromCookie, selectUser, selectIsAuthenticated, selectLoading };
export default userSlice.reducer;
