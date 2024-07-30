import { IWidget } from "../core/interfaces/IWidget";
import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  ReducerCreators,
} from "@reduxjs/toolkit";
import axios from "axios";

interface IWidgetState {
  allWidgets: IWidget[];
  widget: IWidget;
  status: "idle" | "loading" | "resolved" | "rejected";
}

const initialState: IWidgetState = {
  allWidgets: [],
  widget: {
    _id: "",
    name: "",
    description: "",
    type: "",
    icon: "",
    data: null,
  },
  status: "idle",
};

export const fetchAllWidgets = createAsyncThunk(
  "widget/fetchAllWidgets",
  async () => {
    try {
      const response = await axios.get("/widgetsTest.json");
      return response.data as IWidget[];
    } catch (error) {
      console.error("Error fetching widgets:", error);
      throw error;
    }
  },
);

const widget = createSlice({
  name: "widget",
  initialState,
  reducers: (create: ReducerCreators<IWidgetState>) => ({
    setAllWidgets: create.reducer((state, action: PayloadAction<IWidget[]>) => {
      return { ...state, allWidgets: action.payload };
    }),
    setCurrentWidget: create.reducer(
      (state, action: PayloadAction<string | null>) => {
        const widget = state.allWidgets.find(
          widget => widget._id === action.payload,
        );
        if (widget) {
          state.widget = widget as IWidget;
        }
      },
    ),
  }),
  selectors: {
    getAllWidgets: state => state.allWidgets,
    getCurrentWidget: state => state.widget,
    getWidgetStatus: state => state.status,
  },
  extraReducers: builder => {
    builder.addCase(fetchAllWidgets.pending, state => {
      state.status = "loading";
    });
    builder.addCase(
      fetchAllWidgets.fulfilled,
      (state, action: PayloadAction<IWidget[]>) => {
        return { ...state, allWidgets: action.payload, status: "resolved" };
      },
    );
    builder.addCase(fetchAllWidgets.rejected, state => {
      state.status = "rejected";
    });
  },
});

export const { setAllWidgets, setCurrentWidget } = widget.actions;

export const { getAllWidgets, getCurrentWidget, getWidgetStatus } =
  widget.selectors;

export default widget.reducer;
