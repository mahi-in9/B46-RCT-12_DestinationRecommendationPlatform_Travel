import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import destinationReducer from "./slices/destinationSlice";
// import preferencesReducer from "./slices/preferencesSlice";
// import surveyReducer from "./slices/surveySlice";
// import uiReducer from "./slices/uiSlice";
// import compareReducer from "./slices/compareSlice";
// import itineraryReducer from "./slices/itinerarySlice";
import cardReducer from "./slices/cardSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    destinations: destinationReducer,
    // preferences: preferencesReducer,
    // survey: surveyReducer,
    // ui: uiReducer,
    // compare: compareReducer,
    // itinerary: itineraryReducer,
    card: cardReducer,
  },
});
