import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../utills/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const registerUser = createAsyncThunk(
  "register/auth",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return {
        uid: credentials.user.uid,
        email: (await credentials).user.email,
      };
    } catch (error) {
      return rejectWithValue(error.message || "something went wrong");
    }
  }
);

export const loginUser = createAsyncThunk(
  "login.auth",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const credentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return { uid: credentials.user.uid, email: credentials.user.email };
    } catch (error) {
      return registerUser(error.message || "something went wrong");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "logout/user",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
      return null;
    } catch (error) {
      return rejectWithValue(error.message || "something went wrong");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: true,
    error: null,
  },
  reducers: {
    updateUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
export const { updateUser } = authSlice.actions;
