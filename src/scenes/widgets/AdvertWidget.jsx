import { Typography, useTheme, useMediaQuery } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const mediumMain = palette.neutral.mediumMain;

  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  return (
    <WidgetWrapper display={isNonMobileScreens ? "block" : "none"}>
      <FlexBetween>
        <Typography color={dark} variant="h4" fontWeight="600">
          Maybe you like
        </Typography>
        <Typography color={mediumMain} fontSize="15px">Ads</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src="https://13.124.74.251:3500/assets/ads.jpg"
        style={{ borderRadius: "0.75rem", margin: "1.25rem 0" }}
      />
      <Typography color="#555">
        Your pathway to stunning and immaculate beauty and made sure your skin
        is exfoliating skin and shining like light.
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
