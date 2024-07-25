import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from "state";
import { InputBase,Box } from '@mui/material';
import { useState } from 'react';
import WidgetWrapper from 'components/WidgetWrapper';


import MyPostWidget from './MyPostWidget';



const options = [
  '수정',
  '삭제',
];

const ITEM_HEIGHT = 48;

function ConfirmationDialogRaw(props) {
  const { onClose, value: valueProp, open, command,message,userId, postId,description,picturePath, ...other } = props;
  const [value, setValue] = React.useState(valueProp);
  const [post, setPost] = React.useState(description);
  
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);

  // React.useEffect(() => {
  //   if (!open) {
  //     setValue(valueProp);
  //   }
  // }, [valueProp, open]);

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    if(command == "삭제"){
      const postDelete = async () => {
        const response = await fetch(`https://choiyujin.p-e.kr/posts/delete/${userId}/${postId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        const posts = await response.json();
        dispatch(setPosts({ posts }));
      };
      postDelete();
    } else if (command == "수정"){
      const postPatch = async () => {
        const response = await fetch(`https://choiyujin.p-e.kr/posts/patch/${userId}/${postId}`, {
          method: "PATCH",
          headers: {
             Authorization: `Bearer ${token}`,
             'Content-Type': 'application/json',
             },
          body: JSON.stringify({
            description: post
          })
        });
        const posts = await response.json();
        dispatch(setPosts({ posts }));
      };
      postPatch();
    }
    onClose(value);
  };

  return (
 
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', height:"auto" } }}
      maxWidth="xs"
      open={open}
      {...other}
    >
      <DialogTitle sx={{fontSize:"1rem",padding:"1rem", borderBottom:"1px solid #efefef"}}>{command}</DialogTitle>
      { command == "삭제" ?  
          <DialogContent sx={{marginTop:"24px"}}>{message}</DialogContent> 
        : <WidgetWrapper sx={{border:"none",marginBottom:"0", padding:"0em 1em"}}>
            <InputBase
              placeholder="What's on your mind?"
              onChange={(e) => setPost(e.target.value)}
              value={post}
              sx={{
                width: "100%",
                backgroundColor:"#F7F7F7",
                marginTop:"16px",
                padding:"8px 12px",
                borderRadius:"5px"
              }}
            />
            <Box>
              <img
                width="100%"
                height="auto"
                alt="post"
                style={{ borderRadius: "0.75rem", marginTop: "1rem", objectFit:"cover" }}
                src={`https://choiyujin.p-e.kr/assets/${picturePath}`}
              />
            </Box>
          </WidgetWrapper>
      }
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleOk}>Ok</Button>
      </DialogActions>
    </Dialog>

  );
}

export default function LongMenu({postId, userId, description, picturePath}) {
  const [confirmationDialogOpen, setConfirmationDialogOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [command, setCommand] = React.useState("");
  const open = Boolean(anchorEl);

  const posts = useSelector((state) => state.posts);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
    const comm = event.currentTarget.innerText;
    if (comm == "삭제"){
      setCommand("삭제");
      setConfirmationDialogOpen(true);
    } else if (comm == "수정"){
      setCommand("수정");
      setConfirmationDialogOpen(true);
    }

    setAnchorEl(null);
  };
  const  handleConfirmationDialogClose = (newValue) => {
    setConfirmationDialogOpen(false);
  };
  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '6.5ch',

          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
            {option}
          </MenuItem>
        ))}
      </Menu>
      <ConfirmationDialogRaw
        id="ringtone-menu"
        keepMounted
        open={confirmationDialogOpen}
        command = {command}
        userId={userId}
        postId={postId}
        description={description}
        picturePath={picturePath}
        message = {command == "삭제"? "피드를 삭제하시겠습니까? " : "피드를 수정하시겠습니까?"}
        onClose={handleConfirmationDialogClose}
      />
    </div>

  );
}