import { createSlice } from "@reduxjs/toolkit";

interface PopUpState {
  isPopUpOpen: boolean;
  popUpMode: "create" | "update";
}

const initialState: PopUpState = {
  isPopUpOpen: false,
  popUpMode: "create",
};

const popUp = createSlice({
  name: "popUp",
  initialState,
  reducers: {
    togglePopUp: (state, action) => {
      state.isPopUpOpen = action.payload;
    },
    setPopUpMode: (state, action) => {
      state.popUpMode = action.payload;
    },
  },
  selectors: {
    getPopUpState: state => state,
  },
});

export const { togglePopUp, setPopUpMode } = popUp.actions;

export const { getPopUpState } = popUp.selectors;

export default popUp.reducer;
