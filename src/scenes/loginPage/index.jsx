import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";
import FlexBetween from "components/FlexBetween";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  return (
    // <Box>
    //   <Box
    //     width="100%"
    //     backgroundColor={theme.palette.background.alt}
    //     p="1rem 6%"
    //     textAlign="center"
    //   >
    //     <Typography fontWeight="bold" fontSize="32px" color="primary">
    //       Youth.pedia
    //     </Typography>
    //   </Box>

    //   <Box
    //     width={isNonMobileScreens ? "50%" : "93%"}
    //     p="2rem"
    //     m="2rem auto"
    //     borderRadius="1.5rem"
    //     backgroundColor={theme.palette.background.alt}
    //   >
    //     <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
    //       계정을 생성하거나 유스피디아에 로그인하여 일상을 공유해보세요.
    //     </Typography>
    //     <Form />
    //   </Box>
    // </Box>
    <Box position="relative" sx={{width:"100%", height:"100%"}}>
      <Box position="absolute" left="0%" top="50%" width="100%" sx={{transform:'translateY(-50%)'}}>
        {isNonMobileScreens ? (
          <FlexBetween p="2rem 4rem">
            <Box width="50%" p="1.5rem" m="2rem">
              <img 
                width="100%"
                height="auto"
                alt="login"
                src="https://choiyujin.p-e.kr/assets/login.png"
              />
            </Box>
            <Box
              width="50%"
              p="2.4rem 1.5rem"
              m="2rem"
              borderRadius="1.5rem"
              backgroundColor={theme.palette.background.alt}
              borderLeft = "1px solid #EFEFEF"
            >
              <Typography color={theme.palette.primary.main}textAlign = "center" fontWeight="600" variant="h2" sx={{ mb: "0.8rem" }}>
                NewSocial
              </Typography>
              <Typography textAlign = "center" fontWeight="500" variant="h5" sx={{ mb: "2rem" }}>
                계정을 생성하거나 뉴소셜에 로그인하여 <br/>일상을 공유해보세요.
              </Typography>
              <Form />
            </Box>
      
          </FlexBetween>
          
        ) : (
          <Box
            width={isNonMobileScreens ? "50%" : "93%"}
            p="2rem"
            m="2rem auto"
            borderRadius="1.5rem"
            backgroundColor={theme.palette.background.alt}
          >
            <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
              계정을 생성하거나 뉴소셜에 로그인하여 <br/> 일상을 공유해보세요.
            </Typography>
            <Form />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default LoginPage;
