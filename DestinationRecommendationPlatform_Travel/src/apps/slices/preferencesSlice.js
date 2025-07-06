import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../utills/firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
} from "firebase/firestore";

// 🔄 Save user preferences to Firestore
export const savePreferences = createAsyncThunk(
  "preferences/save",
  async ({ uid, data }, { rejectWithValue }) => {
    try {
      await addDoc(collection(db, "preferences"), {
        ...data,
        uid,
        createdAt: new Date().toISOString(),
      });
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// 🔍 Fetch preferences based on current user
export const fetchPreferences = createAsyncThunk(
  "preferences/fetch",
  async (uid, { rejectWithValue }) => {
    try {
      const q = query(
        collection(db, "preferences"),
        where("uid", "==", uid),
        orderBy("createdAt", "desc")
      );
      const snapshot = await getDocs(q);
      const preferences = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return preferences;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const preferencesSlice = createSlice({
  name: "preferences",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearPreferences: (state) => {
      state.list = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(savePreferences.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(savePreferences.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(savePreferences.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchPreferences.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPreferences.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchPreferences.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearPreferences } = preferencesSlice.actions;

export default preferencesSlice.reducer;
