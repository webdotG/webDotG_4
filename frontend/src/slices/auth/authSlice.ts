import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import axios from '../../axios'
import { RootState } from "../../store";
import { typeUserData } from "../../types";

interface AuthState {
  data: typeUserData | null;
  status: 'loading' | 'loaded' | 'error';
}

export const fetchLogin = createAsyncThunk<typeUserData, { email: string, password: string,}, { state: RootState }>(
  'auth/fetchLogin',

  async (values) => {
    console.log("AUTH SLICE AXIOS EMAIL LOGIN ! ")
    try {
      const { email, password,} = values;
      const response: AxiosResponse<typeUserData> = await axios.post('/api/user/login', { email, password });//{ params }
      console.log("AUTH SLICE AXIOS RESPONSE LOGIN ! ")
      return response.data;
    } catch (error) {
      throw Error("Ошибка при получении данных пользователя");
    }
  }
);

export const fetchRegister = createAsyncThunk<typeUserData, {
  email: string,
  password: string,
  confirmPassword: string,
  name: string
}, { state: RootState }>(
  'auth/fetchRegister',

  async (values) => {
    console.log("AUTH SLICE AXIOS EMAIL REGISTER ! ")
    try {
      const { email, password, confirmPassword, name } = values;
      const response: AxiosResponse<typeUserData> = await axios.post('/api/user/register', {
        email,
        password,
        confirmPassword,
        name
      });
      console.log("AUTH SLICE AXIOS RESPONSE REGISTER ! ")
      return response.data;
    } catch (error) {
      throw Error("Ошибка при получении данных пользователя");
    }
  }
);


export const fetchAuth = createAsyncThunk('auth/fetchAuth', async () => {
  try {
    const { data } = await axios.get('/api/user/current');
    console.log("FETCH AUTH API/USER/CURRENT DATA ! ");
    return data;
  } catch (error) {
    throw Error("Ошибка при получении данных пользователя");
  }
});


const initialState: AuthState = {
  data: null,
  status: 'loading',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

    logOut: (state) => {
      state.data = null
      localStorage.removeItem('token');
    }

  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.status = 'loading';
        state.data = null;
      })
      .addCase(fetchLogin.fulfilled, (state, action: PayloadAction<typeUserData>) => {
        state.status = 'loaded';
        state.data = action.payload;
      })
      .addCase(fetchLogin.rejected, (state) => {
        state.status = 'error';
        state.data = null;
      })
      .addCase(fetchAuth.pending, (state) => {
        state.status = 'loading';
        state.data = null;
      })
      .addCase(fetchAuth.fulfilled, (state, action: PayloadAction<typeUserData>) => {
        state.status = 'loaded';
        state.data = action.payload;
      })
      .addCase(fetchAuth.rejected, (state) => {
        state.status = 'error';
        state.data = null;
      })
      .addCase(fetchRegister.pending, (state) => {
        state.status = 'loading';
        state.data = null;
      })
      .addCase(fetchRegister.fulfilled, (state, action: PayloadAction<typeUserData>) => {
        state.status = 'loaded';
        state.data = action.payload;
      })
      .addCase(fetchRegister.rejected, (state) => {
        state.status = 'error';
        state.data = null;
      });
  },
});


export const selectIsAuth = (state: RootState) => {
  console.log("AuthSlice SelectIsAuth STATE.AUTH.DATA ! ")
  return state.auth.data !== null && typeof state.auth.data === 'object' && state.auth.data;
};

export const selectIsAdmin = (state: RootState) => {
  return state.auth.data?.isAdmin || false;
};

export const selectUserName = (state: RootState) => {
  // console.log("AuthSlice SelectIsAuth STATE.AUTH.DATA ! ")
  return state.auth.data?.name; 
};

export const authReducer = authSlice.reducer;

export const { logOut } = authSlice.actions