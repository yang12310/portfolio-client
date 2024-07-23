import { useState } from "react";
import {Box,IconButton,InputBase,Typography,Select,MenuItem,FormControl,useTheme,useMediaQuery} from "@mui/material";
import {Search,Menu,Close} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import FlexEnd from "components/FlexEnd";

import UserImage from "components/UserImage";

import { PiBellLight,PiChatDotsLight,PiUserFill,PiBellSimpleFill,PiGearFill } from "react-icons/pi";
import { TiHome } from "react-icons/ti";
import { RiMessage2Fill } from "react-icons/ri";

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const alt = theme.palette.background.alt;
  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <FlexBetween padding="0.75rem 7%" backgroundColor={alt}>
      <Typography
          width="26%"
          fontWeight="700"
          fontSize="clamp(1rem, 3rem, 3.31rem)"
          color="#000"
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          NewSocial
      </Typography>
      {isNonMobileScreens && (
        <Box
          backgroundColor="#F1F3F7"
          width="42%"
          borderRadius="30px"
          padding="0.4rem 1.1rem"
        >
           <IconButton >
            <Search color="#575757"/>
          </IconButton>
          <InputBase placeholder="검색어를 입력하세요." />
        </Box>
      )}

      {isNonMobileScreens ? (
        <FlexEnd gap="1.5rem" width="26%">
          <FlexBetween gap="1rem"> 
            <PiChatDotsLight 
              style={{
                size:"23" ,
                color:"#333",
                background:"#F1F3F7",
                width:"40px",
                height:"40px",
                borderRadius:"50%",
                padding:"8px"
              }}
            />
            <PiBellLight 
              style={{
                size:"23" ,
                color:"#333",
                background:"#F1F3F7",
                width:"40px",
                height:"40px",
                borderRadius:"50%",
                padding:"8px"
              }}
            />
          </FlexBetween>
          <FormControl variant="standard" value={fullName}>
            <Select
              value={fullName}
              sx={{
                backgroundColor: "#F1F3F7",
                color:"#333333",
                border:"1px solid #624AF3",
                width: "150px",
                borderRadius: "3rem",
                p: "0.4rem 1.3rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
            </Select>
          </FormControl>
        </FlexEnd>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}

      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="100%"
          width="350px"
          backgroundColor="#f1f3f7"
          borderLeft="1px solid #EFEFEF"
        >
          {/* CLOSE ICON */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton 
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          {/* MENU ITEMS */}
          <Box p="1rem">

            {/* user 이미지 / 이름 추가  */}
            <Box gap="0.75rem" display="flex" alignItems="center" paddingBottom="1rem" borderBottom="1px solid #d1d6e1">
              <UserImage image={user.picturePath} size="60px"/>
              <Box>
                <Typography
                  variant="h5"
                  fontWeight="500"
                >
                  {user.firstName} {user.lastName}
                </Typography>
              </Box>
            </Box>
            {/* //user 이미지 / 이름 추가 */}


            <Box display="flex" flexDirection="column" justifyContent="center"gap="1.5rem" borderBottom="1px solid #d1d6e1" padding="1rem 0">
              <Box display="flex" alignItems="center">
                <TiHome size="21" color="#d1d6e1" />
                <Typography sx={{pl:"12px", fontSize:"14px"}}>Home</Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <PiUserFill size="21" color="#d1d6e1" />
                <Typography sx={{pl:"12px", fontSize:"14px"}}>My page</Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <RiMessage2Fill size="21" color="#d1d6e1" />
                <Typography sx={{pl:"12px", fontSize:"14px"}}>Messages</Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <PiBellSimpleFill size="21" color="#d1d6e1" />
                <Typography sx={{pl:"12px", fontSize:"14px"}}>Notifications</Typography>
              </Box>
              <Box display="flex" alignItems="center" >
                <PiGearFill size="21" color="#d1d6e1" />
                <Typography sx={{pl:"12px", fontSize:"14px"}}>Settings</Typography>
              </Box>
            </Box>
            <FormControl variant="standard" value={fullName}>
              <MenuItem onClick={() => dispatch(setLogout())} >
                  Log Out
                </MenuItem>
            </FormControl>
          </Box>
        </Box>
      )}
    </FlexBetween>
  );
};

export default Navbar;
