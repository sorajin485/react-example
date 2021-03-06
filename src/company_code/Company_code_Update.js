import React, { useState,useEffect } from 'react'
// import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, MenuItem, FormControl, Select, IconButton, Tooltip } from '@material-ui/core';
import { Paper, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, IconButton, Button, Tooltip } from '@material-ui/core';
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
    minWidth: '470px',
    maxWidth: '470px'
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
  },
  palette: {
    color: 'white',
    backgroundColor: grey[800],
  },
}));

function Company_code_Update(props){
  const classes = useStyles()
  const {select, location, department, team, refresh}= props
  const [open, setOpen] = useState(false)
  const [alertOpen,setAlertOpen] = useState(false)
  const [tmp, setTmp] = useState({
    code_value : '',
    code_id : '',
    code_name : '',
    code_description : '',
    code_option : '',
    code_sort : ''
  })

  useEffect(()=>{
    if(open === true){
      switch(select){
        case 1:
          setTmp({
            ...tmp,
            "code_name": location.code_name,
            "code_description": location.code_description,
            "code_sort": location.code_sort,
            "code_value": location.code_value,
          })
          break
        case 2:
          setTmp({
            ...tmp,
            "code_name": department.code_name,
            "code_description": department.code_description,
            "code_sort": department.code_sort,
            "code_value": department.code_value,
          })
          break
        case 3:
          setTmp({
            ...tmp,
            "code_name": team.code_name,
            "code_description": team.code_description,
            "code_sort": team.code_sort,
            "code_value": team.code_value,
          })
          break
        default:
          break
      }
    }
    
  },[open])

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
    editTmp().then((res)=>{
      handleClose()
      handleAlertClose()
      refresh()
    })
    .catch(err => {
      console.log("err :",err)
      alert("?????? ?????? ?????????????????????. ?????? ??????????????????.")
    })
    
  }
  
  
  const editTmp = () =>{
    const uri = '/company_code'
    const data = {
      "company-code-update" : {
        code_value : tmp.code_value,
        code_name : tmp.code_name,
        code_description : tmp.code_description,
        code_sort : tmp.code_sort
      }
      
    }
    console.log("editTmp : ",data)
    return patch(uri,data)
  }



  const editFormCheck = (table) =>{
    return(
    <>
      <DialogContentText>{table.code_name}{"->"}{tmp.code_name} </DialogContentText>
      <DialogContentText>{table.code_description}{"->"}{tmp.code_description}</DialogContentText>
      <DialogContentText>{table.code_sort}{"->"}{tmp.code_sort}</DialogContentText>
    </>)
  }
  const handleClickOpen = () => setOpen(true) 
  const handleAlertClose = () => setAlertOpen(false)

  const handleAlertOpen = () => {
    if(tmp.code_name==='')
      alert("????????? ???????????? ??? ??? ????????????.")
    else
      switch(select){
        case 1:
          if(tmp.code_name ===location.code_name && tmp.code_description ===location.code_description && tmp.code_sort===location.code_sort)
            alert("??????????????? ????????????.")
          else
            setAlertOpen(true)
          break
        case 2:
          if(tmp.code_name ===department.code_name && tmp.code_description ===department.code_description && tmp.code_sort===department.code_sort)
            alert("??????????????? ????????????.")
          else
            setAlertOpen(true)
          break
        case 3:
          if(tmp.code_name ===team.code_name && tmp.code_description ===team.code_description && tmp.code_sort===team.code_sort)
            alert("??????????????? ????????????.")
          else
            setAlertOpen(true)
          break
      }
    
  }
  const tableTextField = () => {
    switch(select){
      case 1:
        return (
          <>
            <TextField className={classes.textField} value={location.code_name} disabled label="?????? ??????"></TextField>
            <TextField className={classes.textField} value={location.code_sort} disabled label="??????"></TextField>
            <TextField className={classes.textField} value={location.code_description} disabled style={{width:380}} label="??????"></TextField>
            <TextField className={classes.textField} onChange={handleValueChange} placeholder={location.code_name} name="code_name" value={tmp.code_name} label="?????? ??????"></TextField>
            <TextField className={classes.textField} type="number" onChange={handleValueChange} placeholder={location.code_sort} name="code_sort" value={tmp.code_sort} label="??????"></TextField>
            <TextField className={classes.textField} onChange={handleValueChange} placeholder={location.code_description} name="code_description" value={tmp.code_description} style={{width:380}} label="??????"></TextField>
          </>
        )
      case 2:
        return(
          <>
            <TextField className={classes.textField} value={department.code_name} disabled label="?????? ??????"/>
            <TextField className={classes.textField} value={department.code_sort} disabled label="??????"/>
            <TextField className={classes.textField} value={department.code_description} style={{width:380}} disabled label="??????"/>
            <TextField className={classes.textField} onChange={handleValueChange} placeholder={department.code_name} name="code_name" value={tmp.code_name} label="?????? ??????"></TextField>
            <TextField className={classes.textField} type="number" onChange={handleValueChange} placeholder={department.code_sort} name="code_sort" value={tmp.code_sort} label="??????"></TextField>
            <TextField className={classes.textField} onChange={handleValueChange} placeholder={department.code_description} name="code_description" value={tmp.code_description} style={{width:380}} label="??????"></TextField>
          </>
        )
      case 3:
        return(
          <>
            <TextField className={classes.textField} value={team.code_name} disabled label="???"/>
            <TextField className={classes.textField} value={team.code_sort} disabled label="??????"/>
            <TextField className={classes.textField} value={team.code_description} style={{width:380}} disabled label="??????"/>
            <TextField className={classes.textField} onChange={handleValueChange} placeholder={team.code_name} name="code_name" value={tmp.code_name} label="??? ??????"></TextField>
            <TextField className={classes.textField} type="number" onChange={handleValueChange} placeholder={team.code_sort} name="code_sort" value={tmp.code_sort} label="??????"></TextField>
            <TextField className={classes.textField} onChange={handleValueChange} placeholder={team.code_description} name="code_description" value={tmp.code_description} style={{width:380}} label="??????"></TextField>
          </>
        )
    }
  }
  const editTableTextField = () =>{
    var result
    switch(select){
      case 1:
        result = editFormCheck(location)
        break
      case 2:
        result = editFormCheck(department)
        break
      case 3:
        result = editFormCheck(team)
        break

    }
    return result
  }
  const dialogTitle = () =>{

    switch(select){
      case 1:
        return (
          <>{"?????? ??????"}</>
        )
      case 2:
        return (
          <>{"?????? ??????"}</>
        )
      case 3:
        return (
          <>{"??? ??????"}</>
        )
    }
  }
  const handleValueChange = (e) =>{
    setTmp({
      ...tmp,
      [e.target.name]: e.target.value
    })
  }
  
  return (
    <>
      <Tooltip title="??????">
        {select === 0 ? <IconButton disabled aria-label="edit" onClick={handleClickOpen}>
          <EditIcon fontSize="large"  />
        </IconButton> : <IconButton aria-label="edit" onClick={handleClickOpen}>
          <EditIcon fontSize="large"  />
        </IconButton> }
        
      </Tooltip>
      <Dialog classes={{ paper: classes.dialogPaper }} onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} disableBackdropClick>
        <DialogTitle className={classes.palette}>{dialogTitle()}</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          {tableTextField()}
        </DialogContent>
        <DialogActions>
            {/* <Button variant="contained" className={classes.palette} onClick={this.handleFormSubmit}>??????</Button>
            <Button variant="outlined" onClick={this.handleClose}>??????</Button> */}
            <Button variant="contained" className={classes.palette} onClick={handleAlertOpen}>??????</Button>
            <Button variant="outlined" onClick={handleClose}>??????</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={alertOpen} onClose={handleAlertClose} disableBackdropClick >
          <DialogTitle>?????? ??????</DialogTitle>
          <DialogContent>
            {editTableTextField()}
            ????????? ????????? ?????????????????????????</DialogContent>
          <DialogActions>
            <Button variant="contained" className={classes.palette} onClick={handleFormSubmit}>??????</Button>
            <Button variant="outlined" onClick={handleAlertClose}>??????</Button>
          </DialogActions>
      </Dialog>
    </>
  )
}

export default Company_code_Update;