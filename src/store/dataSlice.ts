import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface Country {
  name: string;
  code: string;
  flag: string;
}

interface Language {
  name: string;
  code: string;
  flag: string;
}

interface TimeZone {
  zone: string;
  gmt: string;
  name: string;
}

interface IDataState {
  countries: Country[];
  languages: Language[];
  timezones: TimeZone[];
  status: "idle" | "loading" | "resolved" | "rejected";
}

const initialState: IDataState = {
  countries: [],
  languages: [],
  timezones: [],
  status: "idle",
};

export const fetchCountries = createAsyncThunk(
  "data/fetchCountries",
  async () => {
    try {
      const response = await axios.get("/countryList.json");
      return response.data as Country[];
    } catch (error) {
      console.error("Error fetching countries:", error);
      throw error;
    }
  },
);
export const fetchLanguages = createAsyncThunk(
  "data/fetchLanguages",
  async () => {
    try {
      const response = await axios.get("/languageList.json");
      return response.data as Language[];
    } catch (error) {
      console.error("Error fetching countries:", error);
      throw error;
    }
  },
);

export const fetchTimezones = createAsyncThunk(
  "data/fetchTimezones",
  async () => {
    try {
      const response = await axios.get("/timeZoneList.json");
      return response.data as TimeZone[];
    } catch (error) {
      console.error("Error fetching countries:", error);
      throw error;
    }
  },
);

export const data = createSlice({
  name: "data",
  initialState,
  reducers: {},
  selectors: {
    getCountry: state => state.countries,
    getLanguage: state => state.languages,
    getTimezone: state => state.timezones,
  },
  extraReducers: builder => {
    builder.addCase(
      fetchCountries.fulfilled,
      (state, action: PayloadAction<Country[]>) => {
        state.countries = action.payload;
        state.status = "resolved";
      },
    );
    builder.addCase(
      fetchLanguages.fulfilled,
      (state, action: PayloadAction<Language[]>) => {
        state.languages = action.payload;
        state.status = "resolved";
      },
    );
    builder.addCase(
      fetchTimezones.fulfilled,
      (state, action: PayloadAction<TimeZone[]>) => {
        state.timezones = action.payload;
        state.status = "resolved";
      },
    );
  },
});

export const { getCountry, getLanguage, getTimezone } = data.selectors;

export default data.reducer;
