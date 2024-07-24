import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PopUpState {
  isPopUpOpen: boolean;
  mode: "create" | "update" | "addList" | "editList" | "addTask" | "editTask";
}

const initialState: PopUpState = {
  isPopUpOpen: false,
  mode: "create",
};

const popUp = createSlice({
  name: "popUp",
  initialState,
  reducers: {
    togglePopUp: (state, action) => {
      state.isPopUpOpen = action.payload;
    },
    setPopUpMode: (
      state,
      action: PayloadAction<
        "create" | "update" | "addList" | "editList" | "addTask" | "editTask"
      >,
    ) => {
      state.mode = action.payload;
    },
  },
  selectors: {
    getPopUpState: state => state,
    getProjectPopMode: state => state.mode,
  },
});

export const { togglePopUp, setPopUpMode } = popUp.actions;

export const { getPopUpState, getProjectPopMode } = popUp.selectors;

export default popUp.reducer;
