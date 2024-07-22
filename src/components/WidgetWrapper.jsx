import { Box } from "@mui/material";
import { styled } from "@mui/system";

const WidgetWrapper = styled(Box)(({ theme }) => ({
  padding: "1.4rem 1.2rem",
  backgroundColor: theme.palette.background.alt,
  borderRadius: "1.25rem",
  border:"1px solid #EFEFEF",
  marginBottom:"1.87rem"
}));

export default WidgetWrapper;
