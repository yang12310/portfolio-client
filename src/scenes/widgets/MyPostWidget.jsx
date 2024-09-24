import {EditOutlined,DeleteOutlined, MoreHorizOutlined} from "@mui/icons-material";
import {Box,Divider,Typography,InputBase,useTheme,Button,IconButton,useMediaQuery } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";


import { PiImageLight,PiVideoCameraLight, PiPaperclipLight } from "react-icons/pi";


const MyPostWidget = ({ picturePath , isProfile}) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", post);

    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }

    const response = await fetch(`https://yujinchoi.kro.kr/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    // debugger;
    const data = await response.json();
    if(isProfile){
      const postList = data.filter((item)=>{
        return _id === item.userId
      })
      dispatch(setPosts({ posts: postList}));
    } else{
      dispatch(setPosts({ posts: data}));
    }
 
  
    setImage(null);
    setPost("");
  };

  return (
    <WidgetWrapper>
      <FlexBetween gap="1.2rem">
        <UserImage image={picturePath} />
        <InputBase
          placeholder="What's on your mind?"
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
          }}
        />
      </FlexBetween>
      {isImage && (
        <Box
          border="1px dashed #ccc"
          backgroundColor={`${palette.neutral.moreLight}`}
          borderRadius="5px"
          mt="1rem"
          p="0.8rem"
        >
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p style={{color : "#a1a1a1"}}>Add Image Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "10%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      <Divider sx={{ margin: "1rem 0" }} />

      <Box display="flex" justifyContent= "space-between">
        <Box display="flex" gap="2rem">
          <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
            <PiImageLight color="#624AF3" size="23" />
            <Typography
              color={mediumMain}
              sx={{ "&:hover": { cursor: "pointer", color: medium } }}
            >
              Image
            </Typography>
          </FlexBetween>

          {isNonMobileScreens ? (
            <>
              <FlexBetween gap="0.5rem">
                <PiVideoCameraLight color="#624AF3" size="23" />
                <Typography color={mediumMain}>Video</Typography>
              </FlexBetween>
              <FlexBetween gap="0.5rem">
                <PiPaperclipLight color="#624AF3" size="23" />
                <Typography color={mediumMain}>Files</Typography>
              </FlexBetween>
              {/* <FlexBetween gap="0.25rem">
                <MicOutlined sx={{ color: mediumMain }} />
                <Typography color={mediumMain}>Audio</Typography>
              </FlexBetween> */}
            </>
          ) : (
            
            <FlexBetween gap="0.25rem">
              <MoreHorizOutlined sx={{ color: mediumMain }} />
            </FlexBetween>
          )}
        </Box>

        <Button
          disabled={!post}
          onClick={handlePost}
          sx={{
            minWidth : "90px",
            fontWeight : "500",
            color: "#FFFFFF",
            backgroundColor: palette.primary.main,
            borderRadius: "6px",
          }}
        >
          POST
        </Button>
      </Box>
    </WidgetWrapper>
  );
};

export default MyPostWidget;
