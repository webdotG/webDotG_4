import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios'
import { RootState } from "../../store";

export const fetchAddUserCommunity = createAsyncThunk(
  'posts/fetchAddUserCommunity',
  async ({ name, dateOfBirth }: { name: string; dateOfBirth: string | null }) => {
    try {
      // console.log("COMMUNITY SLICE AXIOS NAME AGE: ", name, dateOfBirth);
      const response = await axios.post('/api/community', { name, dateOfBirth });
      console.log('Server Response:', response.data);
      return response.data;
    } catch (err) {
      console.error('Error:', err);
    }
  }
);

export const fetchAllUserCommunity = createAsyncThunk(
  'posts/fetchAllUserCommunity',
  async () => {
    try {
      const response = await axios.get('/api/community');
      console.log('Server Response for fetchAllUserCommunity:', response.data);
      return response.data;
    } catch (err) {
      console.error('Error in fetchAllUserCommunity:', err);
    }
  }
);


export const fetchRemoveUser = createAsyncThunk(
  'users/fetchRemoveUser',
  async (userId: number | null) => {
    console.log('FETCH REMOVE USER ISADMIN USER ID : ', userId)
    try {
      const response = await axios.delete(`/api/community/${userId}`, { data: { userId } });
      return response.data.removedUser;
    } catch (error) {
      console.error('Error in removeUser:', error);
    }
  })

const initialState = {
  community: {
    users: [
      {
        id: null,
        name: '',
        date_of_birth: null,
        created_by_user_name: ''
      }
    ],
    status: 'loading',
    removedUser: null as null | {
      id: null;
      name: string;
      date_of_birth: null;
      created_by_user_name: string;
    },
  }
}

const communitySlice = createSlice({
  name: 'community',
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(fetchAddUserCommunity.pending, (state) => {
        state.community.status = 'loading'
        state.community.users = []
      })
      .addCase(fetchAddUserCommunity.fulfilled, (state, action) => {
        state.community.status = 'loaded'
        state.community.users.push(action.payload);
      })
      .addCase(fetchAddUserCommunity.rejected, (state) => {
        state.community.status = 'error'
        state.community.users = []
      })
      .addCase(fetchAllUserCommunity.pending, (state) => {
        state.community.status = 'loading'
        state.community.users = []
      })
      .addCase(fetchAllUserCommunity.fulfilled, (state, action) => {
        state.community.status = 'loaded'
        state.community.users = action.payload.users;
      })
      .addCase(fetchAllUserCommunity.rejected, (state) => {
        state.community.status = 'error'
        state.community.users = []
      })
      .addCase(fetchRemoveUser.pending, (state) => {
        state.community.status = 'loading';
        state.community.users = []
      })
      .addCase(fetchRemoveUser.fulfilled, (state, action) => {
        state.community.status = 'loaded';
        state.community.users = state.community.users.filter(user => user.id !== action.payload.id);
        state.community.removedUser = action.payload;
      })
      .addCase(fetchRemoveUser.rejected, (state) => {
        state.community.status = 'error';
        state.community.users = []
      });
  },
})

export const communityReducer = communitySlice.reducer

export const selectUsersCommunity = (state: RootState) => state.community.community.users;

export const selectRemoveUserCommunity = (state: RootState) => state.community.community.removedUser