import React, { useState } from 'react'
// import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, MenuItem, FormControl, Select, IconButton, Tooltip } from '@material-ui/core';
import { Paper, Typography, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton, Button, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import DeleteIcon from '@material-ui/icons/Delete';
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

function Company_code_Delete(props){
  const classes = useStyles()
  const {select, location, department, team}= props;
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
    if(select!==0){
      return(
        <>
          <TextField className={classes.textField} value={location.code_name} disabled label="위치"></TextField>
          <TextField className={classes.textField} value={location.code_description} style={{width:380}}  disabled label="설명"></TextField>
        </>
     )
    }else{
      return (
        <>
          <TextField className={classes.textField} label="위치"/>
          <TextField className={classes.textField} style={{width:380}} label="설명"/>
        </>
      )
    }
  }
  const departmentTextFideld = () => {
    if(select!==1){
      return (
        <>
          <TextField className={classes.textField} value={department.code_name} disabled label="부서"/>
          <TextField className={classes.textField} value={department.code_description} style={{width:380}} disabled label="설명"/>
        </>
      )
    }else{
      return (
        <>
          <TextField className={classes.textField} label="부서"/>
          <TextField className={classes.textField} style={{width:380}} label="설명"/>
        </>
      )
    }
  }
  const teamTextFideld = () => {
    if(select!==2){
      return (
        <>
          <TextField className={classes.textField} value={team.code_name} disabled label="팀"/>
          <TextField className={classes.textField} value={team.code_description} style={{width:380}} disabled label="설명"/>
        </>
      )
    }else{
      return (
        <>
          <TextField className={classes.textField} label="팀"></TextField>
          <TextField className={classes.textField} style={{width:380}} label="설명"></TextField>
        </>
      )
    }
  }
  const dialogTitle = () =>{
    if(select === 0 ){
      return (
        <>{"위치 수정"}</>
      )
    }
    else if(select === 1 ){
      return (
        <>{"부서 수정"}</>
      )
    }
    else if(select === 2 ){
      return (
        <>{"팀 수정"}</>
      )
    }
  }
  return (
    <>
    {console.log("location true false : ",Boolean(location.code_value))}
    {console.log("department true false : ",Boolean(department.code_value))}
    {console.log("team true false : ",Boolean(team.code_value))}
      <Tooltip title="삭제">
        {select === 0 ? <IconButton disabled aria-label="delete" onClick={handleClickOpen}>
          <DeleteIcon fontSize="large"  />
        </IconButton> : <IconButton aria-label="delete" onClick={handleClickOpen}>
          <DeleteIcon fontSize="large"  />
        </IconButton> }
      </Tooltip>
      <Dialog classes={{ paper: classes.dialogPaper }} onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle className={classes.palette}>{dialogTitle()}</DialogTitle>
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

export default Company_code_Delete;