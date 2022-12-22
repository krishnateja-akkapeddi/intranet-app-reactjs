import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { Private } from "../../domain/Constants";
import { UserType } from "../../domain/models/userType";
import { LocalJsonStorage } from "../../infra/http/local-json-storage";
const storage = LocalJsonStorage.getInstance();
interface AppSliceState {
  userInfo: UserType | null;
  darkMode: boolean | null;
}

const initialState: AppSliceState = {
  userInfo: null,
  darkMode: null,
};

export const appSlice = createSlice({
  name: "userSlice",
  initialState: initialState,
  reducers: {
    storeUser: (state, action: PayloadAction<UserType>) => {
      state.userInfo = action.payload;
    },
    logout: (state, action) => {
      state.userInfo = null;
      storage.remove(Private.USERINFO);
      storage.remove(Private.AUTH);
    },
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
    },
  },
});

export const { storeUser } = appSlice.actions;
export default appSlice.reducer;
