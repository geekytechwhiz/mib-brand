import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import * as React from 'react';

export default function MDBackdrop(props) {
    debugger
  const { show } = props;
  const [open, setOpen] = React.useState(show);
  const handleClose = () => {
    setOpen(false);
  };
   

  return (
    <div>
        
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={show} 
        onClick={handleClose}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    </div>
  );
}
