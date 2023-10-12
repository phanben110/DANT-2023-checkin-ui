import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import {signInRequest} from "../../api";
import { toast } from "react-toastify";

export const login = createAsyncThunk("user/login", async (param, thunkAPI) => {
    const { username, password, cb } = param;
    const result = await signInRequest({ username, password, cb })
      .then((res) => {
        localStorage.setItem("refresh", res.refresh);
        localStorage.setItem("access", res.access);
        cb();
        return res;
      })
      .catch((message) => {
        toast.error("Login Fail. Check Your Network !");
        throw new Error(message);
      });
    return result;
  });
  
  export const logout = createAsyncThunk("user/logout", async () => {
    localStorage.removeItem("refresh");
    localStorage.removeItem("access");
  });

  const userSlice = createSlice({
    name: "userSlice",
    initialState:{
      account: {
        current: {},
        loading: false,
        success: false,
      }
    },
    reducers: {},
    extraReducers:{
      //login
      [login.pending]: (state, action) =>{
        state.account.loading = true;
      },
      [login.fulfilled]: (state, action) => {
        state.account.current = action.payload;
        state.account.loading = false;
        state.account.success = true;
      },
      [login.rejected]: (state, action) => {
        state.account.current = {};
        state.account.loading = false;
        state.account.success = false;
      },

      //logout
      [logout.fulfilled]: (state, action) => {
        state.account.current = {};
        state.account.loading = false;
        state.account.success = false;
      },
    }
  })

  const {reducer, actions} = userSlice;
  export const {} = actions;
  export default reducer