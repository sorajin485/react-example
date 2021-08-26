import React, { useEffect, useState } from 'react';
import { get } from 'axios'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';


const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      { date: '2020-01-05', customerId: '11091700', amount: 3 },
      { date: '2020-01-02', customerId: 'Anonymous', amount: 1 },
    ],
  };
}

function Row(props) {
  const { row } = props
  const { team }= props
  const [open, setOpen] = React.useState(false)
  const classes = useRowStyles()
  console.log("row : ",row)
  console.log("team : ",team)
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
      <TableCell>체크박스</TableCell>
          <TableCell >{row.code_name}</TableCell>
          <TableCell >{row.code_sort}</TableCell>
          <TableCell >{row.code_value}</TableCell>
          <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingLeft: 40 ,paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                팀
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>code_name</TableCell>
                    <TableCell>code_description</TableCell>
                    <TableCell>code_value</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {team[row.code_value].map((team) => (
                    <TableRow key={team.code_value}>
                      <TableCell></TableCell>
                      <TableCell component="th" scope="row">{team.code_name}</TableCell>
                      <TableCell>{team.code_description}</TableCell>
                      <TableCell>{team.code_value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable() {
  const [company_code, setCompany_code] = useState('')
  const [location, setLocation] = useState([])
  const [department, setDepartment] = useState([])
  const [team, setTeam] = useState()
  

  useEffect( () => {
    getCompany_code().then((response) => {
      console.log("useeffect getCompany_code response : ",response)
      setCompany_code(response.data)
    }).catch(error => {
      console.log("useeffect getCompany_code error : ",error)
    })
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
      var data ={}
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
      dep.map(x =>{
        data[x.code_value] = []
        tea.map(y =>{
          if(x.code_value === y.code_option)
          {
            data[x.code_value].push(y)
          }
        })
      })
      setLocation(loc)
      setDepartment(dep)
      setTeam(data)
    }
  },[company_code])

  const setTableHead = () => {
    return (
      <TableHead>
        <TableRow>
        <TableCell></TableCell>
          <TableCell>code_name</TableCell>
          <TableCell>code_description</TableCell>
          <TableCell>code_value</TableCell>
        </TableRow>
      </TableHead>
    )
  }
  const setTableBody = (department, team) => {
    console.log("setTableBody : department : ",department)
    console.log("setTableBody : team : ",team)
    return (
      department.map((row) => (
        <Row key={row.code_value} row={row} team={team} />
        // <TableRow key={row.name}>
        //   <TableCell component="th" scope="row">{row.code_id}</TableCell>
        //   <TableCell align="right">{row.code_name}</TableCell>
        //   <TableCell align="right">{row.code_sort}</TableCell>
        //   <TableCell align="right">{row.code_value}</TableCell>
        //   <TableCell align="right">{row.protein}</TableCell>
        // </TableRow>
      )))
  }

  const getCompany_code = () => {
    const uri = '/company_code'
    return get(uri)
  }

  return (
    <TableContainer component={Paper}>
      {team ? console.log("팀데이터 가공 : ",team):""}
      {/* <Typography variant="h6" gutterBottom component="div">
          부서
      </Typography>
      <Table aria-label="collapsible table">
        {setTableHead()}
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row}  />
          ))}
        </TableBody>
      </Table> */}
      <Typography variant="h6" gutterBottom component="div">
          부서
      </Typography>
      <Table aria-label="collapsible table">
        {setTableHead()}
        <TableBody>
          {team ? setTableBody(department,team) : ""}
        </TableBody>
      </Table>
    </TableContainer>
  );
}