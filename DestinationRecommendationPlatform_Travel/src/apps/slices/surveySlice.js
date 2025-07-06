import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../utills/firebase";
import { addDoc, collection } from "firebase/firestore";

// Async action to submit survey data
export const submitSurvey = createAsyncThunk(
  "survey/submitSurvey",
  async (surveyData, { rejectWithValue }) => {
    try {
      const docRef = await addDoc(collection(db, "preferences"), {
        ...surveyData,
        createdAt: new Date().toISOString(),
      });
      return { id: docRef.id, ...surveyData };
    } catch (error) {
      return rejectWithValue(error.message || "Failed to submit survey");
    }
  }
);

const surveySlice = createSlice({
  name: "survey",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSurvey: (state) => {
      state.data = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitSurvey.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitSurvey.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(submitSurvey.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSurvey } = surveySlice.actions;

export default surveySlice.reducer;
