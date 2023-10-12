import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getListCheckInRequest, getDetailCheckInRequest, getDetailStudentRequest, findDetailRequest } from "../../api";
import { toast } from "react-toastify";

export const getListCheckin = createAsyncThunk("checkin/list", async (body) => {
  console.log("body",body)
  const result = await getListCheckInRequest(body)
    .then((res) => {
      return res;
    })
    .catch((message) => {
      throw new Error(message);
    });
  return result;
});

export const getDetailCheckin = createAsyncThunk("checkin/detail", async (CCCD) => {
  const result = await getDetailCheckInRequest(CCCD)
    .then((res) => {
      return res;
    })
    .catch((message) => {
      throw new Error(message);
    });
  return result;
});

export const getDetailStudent = createAsyncThunk("checkin/student", async(CCCD) => {
  const result = await getDetailStudentRequest(CCCD)
    .then((res) => {
      console.log("res", res)
      return res;
    })
    .catch((message) => {
      throw new Error(message);
    });
  return result;
})

export const findDetail = createAsyncThunk("get/detail", async(CCCD) => {
  const result = await findDetailRequest(CCCD)
    .then((res) => {
      console.log("res", res)
      return res;
    })
    .catch((message) => {
      toast.error("Wrong indentity number !");
      throw new Error(message);
    });
  return result;
})

const checkinSlice = createSlice({
  name: "checkinSlice",
  initialState: {
    listCheckin: {
      list: [],
      pagination: {},
      loading: false,
      success: false,
      error: "",
    },
    detailCheckin: {
      current: [],
      loading: false,
      success: false,
      error: "",
    },
    detailStudent: {
      current: {},
      loading: false,
      success: false,
      error: "",
    },
    finding: {
      current: [],
      loading: false,
      success: false,
      error: "",
    }
  },
  reducers: {},
  extraReducers: {
    //get list
    [getListCheckin.pending]: (state, action) => {
      state.listCheckin.loading = true;
    },
    [getListCheckin.fulfilled]: (state, action) => {
      state.listCheckin.list = action.payload.results;
      state.listCheckin.pagination = action.payload;
      state.listCheckin.loading = false;
      state.listCheckin.success = true;
    },
    [getListCheckin.rejected]: (state, action) => {
      state.listCheckin.loading = false;
      state.listCheckin.success = false;
      state.listCheckin.error = action.payload;
    },
    //get detail
    [getDetailCheckin.pending]: (state, action) => {
      state.detailCheckin.loading = true;
    },
    [getDetailCheckin.fulfilled]: (state, action) => {
      state.detailCheckin.current = action.payload.results;
      state.detailCheckin.loading = false;
      state.detailCheckin.success = true;
    },
    [getDetailCheckin.rejected]: (state, action) => {
      state.detailCheckin.loading = false;
      state.detailCheckin.success = false;
      state.detailCheckin.error = action.payload;
    },
    //get student
    [getDetailStudent.pending]: (state, action) => {
      state.detailStudent.loading = true;
    },
    [getDetailStudent.fulfilled]: (state, action) => {
      state.detailStudent.current = action.payload;
      state.detailStudent.loading = false;
      state.detailStudent.success = true;
    },
    [getDetailStudent.rejected]: (state, action) => {
      state.detailStudent.loading = false;
      state.detailStudent.success = false;
      state.detailStudent.error = action.payload;
    },
    //find detail
    [findDetail.pending]: (state, action) => {
      state.finding.loading = true;
    },
    [findDetail.fulfilled]: (state, action) => {
      state.finding.current = action.payload.results;
      state.finding.loading = false;
      state.finding.success = true;
    },
    [findDetail.rejected]: (state, action) => {
      state.finding.loading = false;
      state.finding.success = false;
      state.finding.error = action.payload;
    },
  }
})

const { reducer, actions } = checkinSlice;
export const { } = actions;
export default reducer