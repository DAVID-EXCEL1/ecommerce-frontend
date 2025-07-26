import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios'; 


const token = localStorage.getItem('token');

const initialState = {
    user: null,
    token: token || null,
    loading: false,
    error: null,
};



export const loginUser = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
    try {
        const { data } = await axios.post('/users/login', credentials);
        localStorage.setItem('token', data.token);
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
});

export const registerUser = createAsyncThunk('auth/register', async (userInfo, thunkAPI) => {
    try {
        const { data } = await axios.post('/users/register', userInfo);
        localStorage.setItem('token', data.token);
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.token = action.payload.token;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.token = action.payload.token;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
