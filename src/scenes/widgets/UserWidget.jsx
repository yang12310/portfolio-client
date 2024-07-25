import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { PiGearLight,PiSuitcaseLight, PiEyeLight,PiHeartLight,PiLinkedinLogoLight,PiTwitterLogoThin } from "react-icons/pi";
import { CiLocationOn } from "react-icons/ci";
import { RiPencilFill } from "react-icons/ri";

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  const mediumMain = palette.neutral.mediumMain;

  const getUser = async () => {
    const response = await fetch(`https://choiyujin.p-e.kr/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
  } = user;

  return (
    <WidgetWrapper>
      {/* FIRST ROW */}
      <FlexBetween
        sx={{cursor:"pointer"}}
        gap="0.5rem"
        pb="1.5rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} size="80px"/>
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.main,
                  cursor: "pointer",
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{friends.length} friends</Typography>
          </Box>
        </FlexBetween>
        <PiGearLight size="30" color="131313"/>
      </FlexBetween>

      <Divider/>

      {/* SECOND ROW */}
      <Box p="1.25rem 0">
        <Box display="flex" alignItems="center" gap="0.75rem" mb="1rem">
          <PiSuitcaseLight color="#624AF3" size="26"/>
          <Typography color="#333">{occupation}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="0.75rem" >
          <CiLocationOn color="#624AF3" size="26"/>
          <Typography color="#333">{location}</Typography>
        </Box>
      </Box>

      <Divider />

      {/* THIRD ROW */}
      <Box p="1.25rem 0">
        <FlexBetween mb="0.5rem">
          <Box display="flex" alignItems="center" gap="0.75rem">
            <PiEyeLight color="#624AF3" size="26"/>
            <Typography fontSize="15px" color={mediumMain}>Viewed your profile</Typography>
          </Box>
          <Typography 
            color="#624AF3" 
            fontWeight="600"
            backgroundColor= "#F5F5F5"
            padding= "2px 0.7rem"
            borderRadius= "30px"
            border= "1px solid #efefef"
          >
            {viewedProfile}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Box display="flex" alignItems="center" gap="0.75rem">
            <PiHeartLight color="#624AF3" size="26"/>
            <Typography fontSize="15px" color={mediumMain}>Heart on your post</Typography>
          </Box>
          <Typography 
            color="#624AF3" 
            fontWeight="600"
            backgroundColor= "#F5F5F5"
            padding= "2px 0.7rem"
            borderRadius= "30px"
            border= "1px solid #efefef"
          
          >
            {impressions}
          </Typography>
        </FlexBetween>
      </Box>

      <Divider />

      {/* FOURTH ROW */}
      <Box pt="1.25rem">
        <Typography fontSize="1.25rem" color="#333" fontWeight="600" mb="1rem">
          Social Profiles
        </Typography>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
           <PiTwitterLogoThin color="#624AF3" size="26"/>
            <Box>
              <Typography color="#333">
                Twitter
              </Typography>
            </Box>
          </FlexBetween>
          <RiPencilFill color="#624AF3"size="18"/>
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            {/* <img src="../assets/linkedin.png" alt="linkedin" /> */}
            <PiLinkedinLogoLight color="#624AF3" size="26"/>
            <Box>
              <Typography color="#333">
                Linkedin
              </Typography>
            </Box>
          </FlexBetween>
          <RiPencilFill color="#624AF3"size="18"/>
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
