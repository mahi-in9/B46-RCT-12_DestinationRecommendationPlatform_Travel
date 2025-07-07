import { useDispatch, useSelector } from "react-redux";
import {
  setGlobalLoading,
  toggleTheme,
  showToast,
  hideToast,
} from "../apps/slices/uiSlice";

export const useUI = () => {
  const dispatch = useDispatch();
  const uiState = useSelector((state) => state.ui);

  return {
    // State
    ...uiState,

    // Actions
    setLoading: (isLoading) => dispatch(setGlobalLoading(isLoading)),
    toggleTheme: () => dispatch(toggleTheme()),
    showToast: (message, type = "info") =>
      dispatch(showToast({ message, type })),
    hideToast: () => dispatch(hideToast()),
  };
};
