import React, { useState } from 'react'
// import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, MenuItem, FormControl, Select, IconButton, Tooltip } from '@material-ui/core';
import { Paper, Typography, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton, Button, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import EditIcon from '@material-ui/icons/Edit';
import { patch } from 'axios'
const useStyles = makeStyles((theme) =>({
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 195
  },
  dialogPaper: {
    minHeight: '450px',
    maxHeight: '450px',
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

function Company_code_Update(props){
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
    setTmp({
      code_value : '',
      code_id : '',
      code_name : '',
      code_description : '',
      code_option : '',
      code_sort : ''
    })
  }

  const handleFormSubmit = () =>{
    if(tmp.code_name ==="" || tmp.code_description ==="")
    {
      alert("모든 칸을 채워주세요.")
    }
    else {
      editTmp().then((res)=>{
        console.log("editTmp : ",res)
        //alert(res.data)
      })
      .catch(err => {
        console.log("err : ",err)
        //alert(err["company-code-resp"])
      })
      //handleClose()
    }
  }
  
  const editTmp = () =>{
    const uri = '/company_code'
    const data = {
      "company-code" : [{
        code_value : tmp.code_value,
        code_id : tmp.code_id,
        code_name : tmp.code_name,
        code_description : tmp.code_description,
        code_option : tmp.code_option,
        code_sort : tmp.code_sort
      }
      ]
    }
    console.log("editTmp : ",data)
    return patch(uri,data)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }
  
  const TableTextField = () => {
    switch(select){
      case 1:
        return (
          <>
            <TextField className={classes.textField} value={location.code_name} disabled label="위치 이름"></TextField>
            <TextField className={classes.textField} value={location.code_sort} disabled label="순서"></TextField>
            <TextField className={classes.textField} value={location.code_description} disabled style={{width:380}} label="설명"></TextField>
            <TextField className={classes.textField} onChange={handleValueChange} placeholder={location.code_name} name="code_name" value={tmp.code_name} label="위치 이름"></TextField>
            <TextField className={classes.textField} type="number" onChange={handleValueChange} placeholder={location.code_sort} name="code_sort" value={tmp.code_sort} label="순서"></TextField>
            <TextField className={classes.textField} onChange={handleValueChange} placeholder={location.code_description} name="code_description" value={tmp.code_description} style={{width:380}} label="설명"></TextField>
          </>
        )
      case 2:
        return(
          <>
            <TextField className={classes.textField} value={department.code_name} disabled label="부서 이름"/>
            <TextField className={classes.textField} value={department.code_sort} disabled label="순서"/>
            <TextField className={classes.textField} value={department.code_description} style={{width:380}} disabled label="설명"/>
            <TextField className={classes.textField} onChange={handleValueChange} placeholder={department.code_name} name="code_name" value={tmp.code_name} label="부서 이름"></TextField>
            <TextField className={classes.textField} type="number" onChange={handleValueChange} placeholder={department.code_sort} name="code_sort" value={tmp.code_sort} label="순서"></TextField>
            <TextField className={classes.textField} onChange={handleValueChange} placeholder={department.code_description} name="code_description" value={tmp.code_description} style={{width:380}} label="설명"></TextField>
          </>
        )
      case 3:
        return(
          <>
            <TextField className={classes.textField} value={team.code_name} disabled label="팀"/>
            <TextField className={classes.textField} value={team.code_sort} disabled label="순서"/>
            <TextField className={classes.textField} value={team.code_description} style={{width:380}} disabled label="설명"/>
            <TextField className={classes.textField} onChange={handleValueChange} placeholder={team.code_name} name="code_name" value={tmp.code_name} label="팀 이름"></TextField>
            <TextField className={classes.textField} type="number" onChange={handleValueChange} placeholder={team.code_sort} name="code_sort" value={tmp.code_sort} label="순서"></TextField>
            <TextField className={classes.textField} onChange={handleValueChange} placeholder={team.code_description} name="code_description" value={tmp.code_description} style={{width:380}} label="설명"></TextField>
          </>
        )
    }
  }
  const editTableTextField = () =>{

  }
  const dialogTitle = () =>{

    switch(select){
      case 1:
        return (
          <>{"위치 수정"}</>
        )
      case 2:
        return (
          <>{"부서 수정"}</>
        )
      case 3:
        return (
          <>{"팀 수정"}</>
        )
    }
  }
  const handleValueChange = (e) =>{
    setTmp({
      ...tmp,
      [e.target.name]: e.target.value
    })
    console.log("handleValueChange [", e.target.name,"] : ",e.target.value)
  }
  return (
    <>
    {console.log("location true false : ",Boolean(location.code_value))}
    {console.log("department true false : ",Boolean(department.code_value))}
    {console.log("team true false : ",Boolean(team.code_value))}
      <Tooltip title="수정">
        {select === 0 ? <IconButton disabled aria-label="edit" onClick={handleClickOpen}>
          <EditIcon fontSize="large"  />
        </IconButton> : <IconButton aria-label="edit" onClick={handleClickOpen}>
          <EditIcon fontSize="large"  />
        </IconButton> }
        
      </Tooltip>
      <Dialog classes={{ paper: classes.dialogPaper }} onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle className={classes.palette}>{dialogTitle()}</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          {TableTextField()}
          
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

export default Company_code_Update;