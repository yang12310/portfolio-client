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
        src="https://yujinchoi.kro.kr/assets/ads.jpg"
        style={{ borderRadius: "0.75rem", margin: "1.25rem 0" }}
      />
      <Typography color="#555" fontSize="15px">
      압도적인 비주얼과 화려한 퍼포먼스의 K-POP, 트렌디하고 파워풀한 매력의 HIP-HOP 그리고 KOREAN DJ의 폭발적인 댄스뮤직이 여러분 앞에 펼쳐집니다.
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
