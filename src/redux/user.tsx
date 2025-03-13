import {createSlice} from "@reduxjs/toolkit";
import {LIMIT} from "../util/Constants";
import {ChatDTO, Post} from "../service";

type InitalStateType = {
  feed: Post[];
  query: string;
  length: number;
  currentChat?: ChatDTO;
};

const initialState: InitalStateType = {
  feed: [],
  length: LIMIT,
  query: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateFeed: (state, action) => {
      state.feed = action.payload;
    },
    setLength: (state, action) => {
      state.length = action.payload;
    },
    setChat: (state, action) => {
      state.currentChat = action.payload;
    },

    addMessage: (state, action) => {
      if (state.currentChat) {
        state.currentChat.messages.push(action.payload);
      }
    },
  },
});

export const {updateFeed, setLength, setChat, addMessage} =
    userSlice.actions;

export default userSlice.reducer;
