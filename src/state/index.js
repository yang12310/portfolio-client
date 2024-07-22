import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null, 
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts; 
      // if(action.payload.userId){
      //   const myPosts = state.posts.filter((post) => {
      //     return (post.userId === action.payload.userId) 
      //   });
      //   state.posts = myPosts; 
      // } else {
      //   state.posts = action.payload.posts; 
      // }
   
    },
    //아래는 내가 작성한 포스트
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) 
        return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
  authSlice.actions;
export default authSlice.reducer;
