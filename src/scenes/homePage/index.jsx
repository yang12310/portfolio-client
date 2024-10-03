import { useState, useRef } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import PopularAdsWidget from "scenes/widgets/PopularAdsWidget";



const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);
  const [ searchValue, setSearchValue ] = useState('');
  // const searchValue =  useRef('');
  console.log("searchValue",searchValue)
  
  return (
    <Box>
      <Navbar 
        searchValue={setSearchValue}
      />
      <Box
        width="100%"
        padding="2rem 7%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.8rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
          <AdvertWidget/>
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={picturePath} isProfile={false}/>
          <PostsWidget userId={_id} isProfile={false} searchValue = {searchValue}/>
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <PopularAdsWidget />
            <FriendListWidget userId={_id} />
          </Box>
        )}
      </Box>
     
    </Box>
  );
};

export default HomePage;
