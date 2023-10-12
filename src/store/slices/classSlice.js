import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getListStudentRequest, updateStudentInforRequest, createNewStudentRequest, deleteStudentRequest } from "../../api";
import { toast } from "react-toastify";

export const getListStudent = createAsyncThunk("class/list", async (body) => {
    const result = await getListStudentRequest(body)
        .then((res) => {
            return res;
        })
        .catch((message) => {
            throw new Error(message);
        });
    return result;
});

export const updateStudent = createAsyncThunk("class/studentupdate", async (param) => {
    console.log("param",param)  
    console.log("param")  
    const result = await updateStudentInforRequest(param.CCCD, param.body)
        .then((res) => {
            param.cb();
            toast.success("Update Successful");
            return res;
        })
        .catch((message) => {
            toast.error("Update Failed !");
            throw new Error(message);
        });
    return result;
});

export const createStudent = createAsyncThunk("class/studentcreate", async (param) => {
    const result = await createNewStudentRequest(param.data)
        .then((res) => {
            param.cb();
            toast.success("Create Successful");
            return res;
        })
        .catch((message) => {
            toast.error("Create Failed !");
            throw new Error(message);
        });
    return result;
});

export const deleteStudent = createAsyncThunk(
    "class/studentdelete",
    async (param) => {
        await deleteStudentRequest(param.CCCD)
            .then((res) => {
                param.cb();
                toast.success("Delete Successful");
                return res;
            })
            .catch((message) => {
                toast.error("Delete failed !");
                throw new Error(message);
            });
    }
);

const classSlice = createSlice({
    name: "classSlice",
    initialState: {
        listStudent: {
            list: [],
            pagination: {},
            loading: false,
            success: false,
            error: "",
        },
        createStudent: {
            loading: false,
            success: false,
            error: "",
        },
        update: {
            loading: false,
            success: false,
            error: "",
        },
        delete: {
            loading: false,
            success: false,
            error: "",
        },
    },
    reducers: {},
    extraReducers: {
        //listCheckin
        [getListStudent.pending]: (state, action) => {
            state.listStudent.loading = true;
        },
        [getListStudent.fulfilled]: (state, action) => {
            state.listStudent.list = action.payload.results;
            state.listStudent.pagination = action.payload;
            state.listStudent.loading = false;
            state.listStudent.success = true;
        },
        [getListStudent.rejected]: (state, action) => {
            state.listStudent.loading = false;
            state.listStudent.success = false;
            state.listStudent.error = action.payload;
        },
        //create
        [createStudent.pending]: (state) => {
            state.createStudent.loading = true;
        },
        [createStudent.fulfilled]: (state) => {
            state.createStudent.loading = false;
            state.createStudent.success = true;
        },
        [createStudent.rejected]: (state) => {
            state.createStudent.success = false;
        },
        //update 
        [updateStudent.pending]: (state) => {
            state.update.loading = true;
        },
        [updateStudent.fulfilled]: (state) => {
            state.update.loading = false;
            state.update.success = true;
        },
        [updateStudent.rejected]: (state) => {
            state.update.success = false;
        },
        //delete 
        [deleteStudent.pending]: (state) => {
            state.delete.loading = true;
        },
        [deleteStudent.fulfilled]: (state) => {
            state.delete.loading = false;
            state.delete.success = true;
        },
        [deleteStudent.rejected]: (state) => {
            state.delete.success = false;
        },
    }
})

const { reducer, actions } = classSlice;
export const { } = actions;
export default reducer