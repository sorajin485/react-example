import React, { useState } from 'react'
// import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, MenuItem, FormControl, Select, IconButton, Tooltip } from '@material-ui/core';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton, Button, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import Add from "@material-ui/icons/AddCircle";
const useStyles = makeStyles((theme) =>({
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 195
  },
  dialogPaper: {
    minHeight: '650px',
    maxHeight: '650px',
    minWidth: '550px',
    maxWidth: '550px'
  },
  palette: {
    color: 'white',
    backgroundColor: grey[800],
  },
  explanation: {
    fontSize: '0.8em',
    color :  grey[800]
  },
  dialogContent: {
    margin: theme.spacing(1)
  },
  textField : {
    margin : theme.spacing(1)
  }
}));

function Company_code_Create(props){
  const classes = useStyles()
  const { location, department, team}= props;
  const [open, setOpen] = useState(false);
  const [tmp, setTmp] = useState({
    code_value : '',
    code_id : '',
    code_name : '',
    code_description : '',
    code_option : '',
    code_sort : ''
  })


  const handleClose = () => {
    setOpen(false)
  }

  const setCode_id_option = () => {
    
  }
  const handleFormSubmit = () =>{

  }
  


  const handleClickOpen = () => {
    setOpen(true)
  }
  
  const locationTextFideld = () =>{
    if(location.code_value){
      return(
        <>
          <TextField className={classes.textField} value={location.code_name} disabled label="위치"></TextField>
          <TextField className={classes.textField} style={{width:380}} value={location.code_description} disabled label="위치"></TextField>
        </>
     )
    }else{
      return (
        <>
          <TextField className={classes.textField} label="위치"/>
          <TextField className={classes.textField} style={{width:380}} label="위치"/>
        </>
      )
    }
  }
  const departmentTextFideld = () => {
    if(department.code_value || !location.code_value && !team.code_value){
      return (
        <>
          <TextField className={classes.textField} disabled label="부서"/>
          <TextField className={classes.textField} style={{width:380}} disabled label="부서"/>
        </>
      )
    }else{
      return (
        <>
          <TextField className={classes.textField} label="부서"/>
          <TextField className={classes.textField} style={{width:380}} label="부서"/>
        </>
      )
    }
  }
  const teamTextFideld = () => {
    if(!department.code_value){
      return (
        <>
          <TextField className={classes.textField} disabled label="팀"/>
          <TextField className={classes.textField} style={{width:380}} disabled label="팀"/>
        </>
      )
    }else{
      return (
        <>
          <TextField className={classes.textField} label="팀"></TextField>
          <TextField className={classes.textField} style={{width:380}} label="팀"></TextField>
        </>
      )
    }
  }
  
  return (
    <>
    {console.log("location true false : ",Boolean(location.code_value))}
    {console.log("department true false : ",Boolean(department.code_value))}
    {console.log("team true false : ",Boolean(team.code_value))}
      <Tooltip title="등록">
        <IconButton aria-label="add" onClick={handleClickOpen}>
          <Add fontSize="large"  />
        </IconButton>
      </Tooltip>
      <Dialog classes={{ paper: classes.dialogPaper }} onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle className={classes.palette}>Set backup account</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          {locationTextFideld()}
          {departmentTextFideld()}
          {teamTextFideld()}
          
        </DialogContent>
        <DialogActions>
            {/* <Button variant="contained" className={classes.palette} onClick={this.handleFormSubmit}>확인</Button>
            <Button variant="outlined" onClick={this.handleClose}>취소</Button> */}
            <Button variant="contained" className={classes.palette} onClick={handleFormSubmit}>확인</Button>
            <Button variant="outlined" onClick={handleClose}>취소</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Company_code_Create;