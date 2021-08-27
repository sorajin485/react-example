import React, { useState } from 'react'
// import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, MenuItem, FormControl, Select, IconButton, Tooltip } from '@material-ui/core';
import { Dialog, DialogTitle, IconButton, Tooltip } from '@material-ui/core';
//import { makeStyles } from '@material-ui/core/styles';
import Add from "@material-ui/icons/AddCircle";
// const useStyles = makeStyles((theme) =>({
//   formControl: {
//     margin: theme.spacing(1),
//     minWidth: 120,
//   },
//   selectEmpty: {
//     marginTop: theme.spacing(2),
//   },
//   table: {
//     minWidth: 650,
//   },
// }));

function Company_code_Create(props){
  //const classes = useStyles()
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }
  
  
  return (
    <>
      <Tooltip title="User 등록">
        <IconButton aria-label="add" onClick={handleClickOpen}>
          <Add fontSize="large"  />
        </IconButton>
      </Tooltip>
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
      </Dialog>
    </>
  )
}

export default Company_code_Create;