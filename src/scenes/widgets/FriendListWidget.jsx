import { Box, Button, Typography } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";

import { TfiArrowCircleDown, TfiArrowCircleUp } from "react-icons/tfi";
import FlexBetween from "components/FlexBetween";

const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  const [page, setPage] = useState(null);
  const [pageFriends, setPageFriends] = useState([]);
  const [queryFriends, setQueryFriends] = useState(false);

  const getFriends = async () => {
    const response = await fetch(
      `https://choiyujin.p-e.kr/users/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
    setQueryFriends(true);
    setPage(0);
    const selectedFriends = data.slice(page * 5, (page + 1) * 5);
    setPageFriends(selectedFriends);

  };

  useEffect(() => {
    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (queryFriends){
      const selectedFriends = friends.slice(page * 5, (page + 1) * 5);
      setPageFriends(selectedFriends);
    }
  },[friends])

  const pageNext = ()=>{
    const selectedFriends = friends.slice((page + 1) * 5, (page + 2) * 5);
    setPageFriends(selectedFriends);
    setPage(page +1)
  }
  const pagePrev = ()=>{
    const selectedFriends = friends.slice((page -1) * 5, page * 5);
    setPageFriends(selectedFriends);
    setPage (page -1)
  }

  return (
    <WidgetWrapper>
      <Typography
        variant="h4"
        fontWeight="600"
        sx={{ mb: "1.5rem" }}
      >
        Friends List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.2rem" >
        {pageFriends.map((friend) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.location}
            userPicturePath={friend.picturePath}
          />
        ))}
      </Box>
      
      {/* 5개가 넘어갈 때 생겨남 */}
      <Box display="grid" width="50%" margin="0 auto">
        <FlexBetween mt="1.25rem">
          <Button disabled={page <= 0 ? true : null} onClick={pagePrev}>PREV</Button>
          <Button disabled={friends.length-((page+1) * 5)< 0 ? true : null} onClick={pageNext}>NEXT</Button>
    
        </FlexBetween>
      </Box>
  
    </WidgetWrapper>
  );
};

export default FriendListWidget;
