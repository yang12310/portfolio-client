
import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import LinesEllipsis from 'react-lines-ellipsis'




const OneAdWidget = ({post}) => {
  const { palette } = useTheme();
  const mediumMain = palette.neutral.mediumMain;

  return (
    <>
      <Box mb="0.75rem">
        <FlexBetween gap="0.75rem" alignItems="stretch">
          <img
            width="100px"
            height="75px"
            alt="feed"
            src={`https://yujinchoi.kro.kr/assets/${post.picturePath}`}
            style={{ borderRadius: "0.5rem", objectFit:"cover" }}
          />
          <Box width="calc(100% - 100px)" fontSize="15px">
            <LinesEllipsis 
              text={post.description}
              maxLine='2'
              ellipsis='...'
              trimRight
              basedOn='letters'
            />
            <Typography variant="h6" color={mediumMain} mt="1rem">@official</Typography>
          </Box>
        </FlexBetween>
      </Box>
    </>
  );
};

export default OneAdWidget;
