import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";
import FlexBetween from "components/FlexBetween";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  return (
    <Box position="relative" sx={{width:"100%", height:"100%"}}>
      <Box position="absolute" left="0%" top="50%" width="100%" sx={{transform:'translateY(-50%)'}}>
        {isNonMobileScreens ? (
          <FlexBetween p="2rem 4rem" maxWidth="80%" margin="0 auto">
            <Box width="45%" p="1.5rem" m="2rem">
              <img 
                width="100%"
                height="auto"
                alt="login"
                src="login.png"
              />
            </Box>
            <Box width="55%" m="2rem">
              <Box
                p="2.4rem 1.5rem"
                borderRadius="1.5rem"
                backgroundColor={theme.palette.background.alt}
                borderLeft = "1px solid #EFEFEF"
              >
                <Typography color={theme.palette.primary.main}textAlign = "center" fontWeight="600" variant="h2" sx={{ mb: "0.8rem" }}>
                  U-Jeans
                </Typography>
                <Typography textAlign = "center" fontWeight="500" variant="h5" sx={{ mb: "2rem" }}>
                  ID: guest@mail.com <br />Password: guest <br />를 이용하여 U-Jeans에 로그인할 수 있습니다. 
                </Typography>
                <Form />
              </Box>
              <Box sx={{marginTop:"1rem", textAlign:"right"}}>
                <a href="https://yang12310.github.io/tutorial-desc/" target="_blank"
                style={{background: "#e9e5ff", color:"#333",
                  padding: "10px 16px",
                  border: "1px solid #634af3",
                  display: "inline-block",
                  borderRadius: "8px",
                  textDecoration: "none"}}
                >Portfolio 상세설명 보기</a>
              </Box>
            </Box>
          </FlexBetween>
          
        ) : (
          <Box>
            <Box
            width={isNonMobileScreens ? "50%" : "93%"}
            p="2rem"
            m="2rem auto"
            borderRadius="1.5rem"
            backgroundColor={theme.palette.background.alt}
          >
            <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
              ID: guest@mail.com <br />Password: guest <br />를 이용하여 U-Jeans에 로그인할 수 있습니다. 
            </Typography>
            <Form />
          </Box>
          <Box sx={{marginTop:"1rem", textAlign:"right", marginRight:"32px"}}>
                <a href="https://yang12310.github.io/tutorial-desc/" target="_blank"
                style={{background: "#e9e5ff", color:"#333",
                  padding: "10px 16px",
                  border: "1px solid #634af3",
                  display: "inline-block",
                  borderRadius: "8px",
                  textDecoration: "none"}}
                >Portfolio 상세설명 보기</a>
              </Box>
          </Box>
          
          
        )}
      </Box>
    </Box>
  );
};

export default LoginPage;
