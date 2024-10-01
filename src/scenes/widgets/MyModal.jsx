import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius:'20px',
  boxShadow: 16,
  p: 4,
};

export default function MyModal({open, setOpen, title, message}) {
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" 
            sx={{textAlign:"center", color:"#555"}}
          >
            {title}
          </Typography>
          <Typography id="modal-modal-description" 
            sx={{ 
              mt: 1.4, 
              mb:2.4,
              textAlign:"center", 
              fontSize:"17px", 
              fontWeight:"600" }}
          >
            {message}
          </Typography>
          <Button onClick={handleClose}
            sx={{
              margin:"0 auto",
              display:"block",
              backgroundColor:"#efedff",
              width:"80px"
            }}
          >
            닫기
          </Button>
        </Box>
      
      </Modal>
    </div>
  );
}
