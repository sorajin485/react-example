import React, { useState, useEffect } from 'react'
// import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, MenuItem, FormControl, Select, IconButton, Tooltip } from '@material-ui/core';
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Button, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import DeleteIcon from '@material-ui/icons/Delete';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import axios from 'axios';
const useStyles = makeStyles((theme) =>({
  root: {
    height: 240,
    flexGrow: 1,
    maxWidth: 400,
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 195
  },
  dialogPaper: {
    minWidth: '350px',
    maxWidth: '350px'
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
  const {select, location, department, team,refresh}= props;
  const [open, setOpen] = useState(false);
  const [tmp, setTmp] = useState([])

  useEffect(()=>{
    var result = []
    if(open === true){
      switch(select){
        case 1:
          result.push(location.select.code_value)
          department.view.forEach(x => {
            result.push(x.code_value)
            team.table[x.code_value].forEach(y=>{
              result.push(y.code_value)
            })
          })
          
          break
        case 2:
          result.push(department.select.code_value)
          team.table[department.select.code_value].forEach(d=>{
            result.push(d.code_value)
          })
          break
        case 3:
          result.push(team.select.code_value)
          console.log("team result : ",result)
          break
        default:
          break
      }
    }
    setTmp(result)
  },[open])

  const handleClose = () => {
    setOpen(false)
  }
  const handleFormSubmit = () =>{
    deleteTmp().then((res)=>{
      handleClose()
      refresh()
    })
    .catch(err => {
      alert("해당 삭제 실패하였습니다. 다시 시도해주세요.")
    })
    
  }
  const deleteTmp = () =>{
    const uri = '/company_code'
    const data = {
      "company-code-delete" : 
        tmp
      
    }
    console.log("deleteTmp : ",data)
    return axios.delete(uri,{data:data})
  }
  const handleClickOpen = () => {
    setOpen(true)
  }
  
  const dialogTitle = () =>{
    var result
    switch (select) {
      case 1:
        result = (<>{"위치 삭제"}</>)
        break;
      case 2:
        result = (<>{"부서 삭제"}</>)
        break;
      case 3:
        result = (<>{"팀 삭제"}</>)
        break;
    }
    return result    
  }
  const setTreeView = () =>{
    var result
    var i
    switch (select) {
      case 1:
        i=2
        result = (<TreeItem nodeId="root" label={location.select.code_name}>
            {department.view.map(x=>{
              return (<TreeItem key={x.code_value} nodeId={'1'} label={x.code_name}>
                {team.table[x.code_value].map(y=>{
                  return (<TreeItem key={y.code_value} nodeId={''+i++} label={y.code_name}/>)
              })}</TreeItem>)
            }         
          )}</TreeItem>
        )
        break;
      case 2:
        i=2
        result= (
          <TreeItem nodeId="root" label={department.select.code_name}>
            {team.table[department.select.code_value].map(x=>{
              return <TreeItem nodeId={''+i++} label={x.code_name}/>
            })}
          </TreeItem>
        )
        break;
      case 3:
        result= (
          <TreeItem nodeId="root" label={team.select.code_name}/>
        )
        break;
      default:

        break;
    }

    return result
  }
  return (
    <>
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
            <TreeView
              className={classes.root}
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
              defaultExpanded={['root','1']}
            >
                {setTreeView()} 
              </TreeView>
          해당 데이터가 모두 삭제됩니다.</DialogContent>
        <DialogActions>
            {/* <Button variant="contained" className={classes.palette} onClick={this.handleFormSubmit}>확인</Button>
            <Button variant="outlined" onClick={this.handleClose}>취소</Button> */}
            <Button variant="contained" className={classes.palette} onClick={handleFormSubmit}>삭제</Button>
            <Button variant="outlined" onClick={handleClose}>취소</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Company_code_Delete;