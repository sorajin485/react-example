import React, { useEffect, useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton, Button, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { post } from 'axios'
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
  const {select, location, department, team, refresh}= props;
  const [open, setOpen] = useState(false);
  const [tmp, setTmp] = useState({
    code_value : '',
    code_id : '',
    code_name : '',
    code_description : '',
    code_option : '',
    code_sort : ''
  })
  
  const codeValueAI = (table,split,defaultVal) =>{
    var intval=0
    var strval=defaultVal
    var ary = table.sort().map(d=>{
      return parseInt(d.code_value.substring(split))
    })
    for(var i=0;ary.length;i++){
      if(i+1 === ary[i])            
        continue;
      else{
        intval=i+1
        break
      }            
    }
    if(intval === 0)
      intval=ary.length+1
    if(intval < 10)
    {
      strval = strval + "0" + intval
    }
    else{
      strval = strval + intval
    }
    return strval
  }

  useEffect(()=>{
    if(open ===true){
      var result 
      var defaultVal
      switch(select){
        case 0:
          defaultVal = 'A'
          result = codeValueAI(location.table,1,defaultVal)
          setTmp({
            ...tmp,
            "code_sort": location.table.length+1,
            "code_option":'',
            "code_value": result,
            "code_id":"location"
          })
          break
        case 1:
          defaultVal = location.select.code_value
          result = codeValueAI(department.view,3,defaultVal)
          setTmp({
            ...tmp,
            "code_sort": department.view.length+1,
            "code_option": location.select.code_value,
            "code_value": result,
            "code_id":"department"
          })
          break
        case 2:
          defaultVal = department.select.code_value//team.table[department.select.code_value][0].code_value.substring(0,5)
          result = codeValueAI(team.table[department.select.code_value],5,defaultVal)
          setTmp({
            ...tmp,
            "code_sort" : team.table[department.select.code_value].length+1,
            "code_option": department.select.code_value,
            "code_value": result,
            "code_id":"team"
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
    if(tmp.code_name ==="" || tmp.code_description ==="")
    {
      alert("?????? ?????? ???????????????.")
    }
    else {
      addTmp().then((res)=>{
        refresh()
        handleClose()  
      })
      .catch(err => {
        alert("?????? ????????? ?????????????????????. ?????? ??????????????????")
      }) 
    }
  }
  
  const addTmp = () =>{
    const uri = '/company_code'
    const data = {
      "company-code-create" : [{
        code_value : tmp.code_value,
        code_id : tmp.code_id,
        code_name : tmp.code_name,
        code_description : tmp.code_description,
        code_option : tmp.code_option,
        code_sort : tmp.code_sort
      }
      ]
    }
    return post(uri,data)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }
  
  const locationTextFideld = () =>{
    if(select!==0){
      return(
        <>
          <TextField className={classes.textField} value={location.select.code_name} disabled label="??????"></TextField>
          <TextField className={classes.textField} value={location.select.code_description} style={{width:380}}  disabled label="??????"></TextField>
        </>
     )
    }else{
      return (
        <>
          <TextField className={classes.textField} value={tmp.code_name} type="text" name="code_name" label="??????" onChange={handleValueChange}/>
          <TextField className={classes.textField} value={tmp.code_description} type="text" name="code_description" style={{width:380}} label="??????" onChange={handleValueChange}/>
        </>
      )
    }
  }
  const departmentTextFideld = () => {
    if(select!==1){
      return (
        <>
          <TextField className={classes.textField} value={department.select.code_name} disabled label="??????"/>
          <TextField className={classes.textField} value={department.select.code_description} style={{width:380}} disabled label="??????"/>
        </>
      )
    }else{
      return (
        <>
          <TextField className={classes.textField} value={tmp.code_name} type="text" name="code_name" label="??????" onChange={handleValueChange}/>
          <TextField className={classes.textField} value={tmp.code_description} type="text" name="code_description" style={{width:380}} label="??????" onChange={handleValueChange}/>
        </>
      )
    }
  }
  const teamTextFideld = () => {
    if(select!==2){
      return (
        <>
          <TextField className={classes.textField} value={team.select.code_name} disabled label="???"/>
          <TextField className={classes.textField} value={team.select.code_description} style={{width:380}} disabled label="??????"/>
        </>
      )
    }else{
      return (
        <>
          <TextField className={classes.textField} value={tmp.code_name} type="text" name="code_name" label="???" onChange={handleValueChange}/>
          <TextField className={classes.textField} value={tmp.code_description} type="text" name="code_description" style={{width:380}} label="??????" onChange={handleValueChange}/>
        </>
      )
    }
  }
  const dialogTitle = () =>{
    if(select === 0 ){
      return (
        <>{"?????? ??????"}</>
      )
    }
    else if(select === 1 ){
      return (
        <>{"?????? ??????"}</>
      )
    }
    else if(select === 2 ){
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
      {select === 3 ? <IconButton disabled aria-label="add" onClick={handleClickOpen}>
          <Add fontSize="large"  />
        </IconButton> : <IconButton aria-label="add" onClick={handleClickOpen}>
          <Add fontSize="large"  />
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
            <Button variant="contained" className={classes.palette} onClick={handleFormSubmit}>??????</Button>
            <Button variant="outlined" onClick={handleClose}>??????</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Company_code_Create;