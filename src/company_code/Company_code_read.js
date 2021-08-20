import React, { Fragment, useEffect, useState } from 'react'
import { get } from 'axios'

import { makeStyles } from '@material-ui/core/styles';

import {InputLabel,MenuItem,FormHelperText,FormControl,Select }from '@material-ui/core';

import { Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper } from '@material-ui/core';

import { Company_code_Create } from '.'

const useStyles = makeStyles((theme) =>({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  table: {
    minWidth: 650,
  },
}));


function Company_code_read(){
  const classes = useStyles();
  const [age, setAge] = useState('');

  const [company_code, setCompany_code] = useState('')
  const [location, setLocation] = useState([])
  const [department, setDepartment] = useState([])
  const [team, setTeam] = useState([])
  const [select_location, setSelect_location] = useState('')
  const [select_department,setSelect_department] = useState('')

  
  //첫실행시
  useEffect(()=>{
      console.log("start")
      getCompany_code().then((response) => {
        console.log("useeffect getCompany_code response : ",response)
        setCompany_code(response.data)
      }).catch(error => {
        console.log("useeffect getCompany_code error : ",error)
      })
      return() => {
        console.log("end")
      }
  },[])

  useEffect(() => {
    console.log("company_code useEffect start")
    if(company_code===""){
      console.log("useEffect company_code : nodata")
    }
    else{
      var loc = []
      var dep = []
      var tea = []
      company_code.map(d => {
        if(d.code_id === "location")
        {
          loc.push(d)
        }
        else if(d.code_id === "department")
        {
          dep.push(d)
        }
        else if(d.code_id === "team")
        {
          tea.push(d)
        }
      })
      setLocation(loc)
      setDepartment(dep)
      setTeam(tea)
    }
  },[company_code])

  useEffect(()=>{
    console.log("useEffect location, department, team" )
    if(location.length && department.length && team.length ){
      console.log("location l : ",location.length)
      console.log("department l : ",department.length)
      console.log("team l : ",team.length)
    }else{
      console.log("???")
    }
  },[location,department,team])

  const getCompany_code = () => {
    const uri = '/company_code'
    return get(uri)
  }
  
  const setTableBody = (rows) => {
    return (
      rows.map((row) => (
        <TableRow key={row.name}>
          <TableCell component="th" scope="row">{row.code_id}</TableCell>
          <TableCell align="right">{row.code_name}</TableCell>
          <TableCell align="right">{row.code_sort}</TableCell>
          <TableCell align="right">{row.code_value}</TableCell>
          <TableCell align="right">{row.protein}</TableCell>
        </TableRow>
      ))
    )
  }
  
  const setTableHead = () => {
    return (
      <TableHead>
        <TableRow>
          <TableCell>위치</TableCell>
          <TableCell align="right">Calories</TableCell>
          <TableCell align="right">Fat&nbsp;(g)</TableCell>
          <TableCell align="right">Carbs&nbsp;(g)</TableCell>
          <TableCell align="right">Protein&nbsp;(g)</TableCell>
        </TableRow>
      </TableHead>
    )
  }

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return(
    <Fragment>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={age}
          onChange={handleChange}
          label="Age"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <Company_code_Create />
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        {setTableHead()}
        <TableBody>
          {company_code ? setTableBody(company_code) : ""}
        </TableBody>
      </Table>
      </TableContainer>
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        {setTableHead()}
        <TableBody>
          {company_code ? setTableBody(company_code) : ""}
        </TableBody>
      </Table>
      </TableContainer>
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        {setTableHead()}
        <TableBody>
          {company_code ? setTableBody(company_code) : ""}
        </TableBody>
      </Table>
      </TableContainer>
    </Fragment>
  )
}

export default Company_code_read;