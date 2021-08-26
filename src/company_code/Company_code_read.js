import React, { Fragment, useEffect, useState } from 'react'
import { get } from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import {InputLabel,MenuItem,FormHelperText,FormControl,Select, FormControlLabel }from '@material-ui/core';
import {RadioGroup,FormGroup,Checkbox,Radio, Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper } from '@material-ui/core';
import {Collapse,IconButton,Box,Typography} from '@material-ui/core'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

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
const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});




function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function Company_code_read(){
  const classes = useStyles();
  const [company_code, setCompany_code] = useState('')
  const [location, setLocation] = useState({
    table : [],
    select : [],
  })
  const [department, setDepartment] = useState({
    table : [],
    view : [],
    select : {code_value : ""}
  })
  const [team, setTeam] = useState({
    table : [],
    view : [],
    select : {code_value : ""}
  })
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');

  
  //첫실행시
  useEffect(()=>{
      getCompany_code().then((response) => {
        setCompany_code(response.data)
      }).catch(error => {
        console.log("useeffect getCompany_code error : ",error)
      })
      return() => {
        console.log("end")
      }
  },[])

  useEffect(() => {
    if(company_code!==""){
      var loc = []
      var dep = []
      var tea = []
      var data= {}
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
      setLocation({
        ...location,
        ["table"]: loc
      })
      setDepartment({
        ...department,
        ["table"]: dep
      })
      dep.map(x=>{
        data[x.code_value] =[]
        tea.map(y=>{
          if(x.code_value === y.code_option)
          {
            data[x.code_value].push(y)
          }
        })
      })
      setTeam({
        ...team,
        ["table"]: data
      })
    }
  },[company_code])

  useEffect(() => {
    if(location.select !=="")
    {
      var {table} = department
      var view = []
      table.map(d => {
        if(d.code_option === location.select)
        {
          view.push(d)
        }
      })
      setDepartment({
        ...department,
        ["view"]: view,
        ["select"]: {code_value : ""}
      })
      
    }
  },[location.select])

  const getCompany_code = () => {
    const uri = '/company_code'
    return get(uri)
  }
  
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const departmentHandleClick = (event, _department) =>{
    let newSelected = department.select

    if(_department.code_value !== department.select.code_value)
    {
      newSelected = _department
      setDepartment({
        ...department,
        ["select"]:newSelected
      })
      setTeam({
        ...team,
        ["select"]:{code_value : ""}
      })
    }else{
      setDepartment({
        ...department,
        ["select"]:newSelected
      })
    }
  }
  const teamHandleClick = (event, _team) =>{
    let newSelected = team.select

    if(department.select.code_value ===_team.code_option)
    {
      if(_team.code_value !== team.select.code_value)
      {
        newSelected = _team
        setTeam({
          ...team,
          ["select"]:newSelected
        })
      }
    }
    else {
      
    }

  }

  const isDepSelected = (_department) => {
    return (department.select.code_value.indexOf(_department.code_value) !==-1)
  }
  const isTeamSelected = (_team) => {
    return (team.select.code_value.indexOf(_team.code_value) !==-1)
  }

  const setTableBody = (rows) => {
    console.log("team : ",team)
    return (
      rows.map((row) => {
        const isDepartmentSelected = isDepSelected(row.code_value)
        return(
        <TableRow 
          onClick={(event) => departmentHandleClick(event,row.code_value)}
          key={row.code_value}
        >
          <TableCell>
            <Radio 
              checked={isDepartmentSelected}
            />
          </TableCell>
          <TableCell component="th" scope="row">{row.code_id}</TableCell>
          <TableCell >{row.code_name}</TableCell>
          <TableCell >{row.code_sort}</TableCell>
          <TableCell >{row.code_value}</TableCell>
        </TableRow>
      )}
    ))
  }
  
  

  const locationHandleChange = (event) =>{
    setLocation({
      ...location,
      ["select"]: event.target.value
    })
    setDepartment({
      ...department,
      ["select"]: {code_value : ""}
    })
    setTeam({
      ...team,
      ["select"]: {code_value : ""}
    })
  }
  
  const setLocationForm = (loc) =>{
    return (
      <RadioGroup aria-label="location" name="location" value={location.select} onChange={locationHandleChange} >
        {loc.map(d => {
          return (
          <FormControlLabel 
            value={d.code_value}
            control={<Radio />}
            label={d.code_name}
          />
        )})}
      </RadioGroup>
    )
  }

  return (
    <Fragment>
      {location.table ? setLocationForm(location.table) : ""}
      <TableContainer component={Paper}>
      <Typography variant="h6" gutterBottom component="div">부서</Typography>
      <Table className={classes.table} aria-label="simple table">
        <EnhancedTableHead 
          classes={classes}
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
        />
        <TableBody>
          {location.select ? 
          department.view.map((row) => (
            <Row key={row.code_value} departmentTable={row} teamTable={team.table} 
            isDepSelected={isDepSelected} departmentHandleClick={departmentHandleClick} 
            isTeamSelected={isTeamSelected} teamHandleClick={teamHandleClick}/>
          )):""
          // setTableBody(department.view) : ""}
          }
        </TableBody>
      </Table>
      </TableContainer>
    </Fragment>
  )
}

export default Company_code_read;

function Row(props) {
  const { departmentTable,teamTable } = props
  const { isDepSelected, isTeamSelected, departmentHandleClick,teamHandleClick }= props
  const [open, setOpen] = React.useState(false)
  const classes = useRowStyles()
  console.log("row : ",departmentTable)
  console.log("team : ",teamTable)

  // const isDepartmentSelected = isDepSelected(departmentTable.code_value)
  // const isTeamSelected = isDepSelected(team.code_value)
  return (
    <React.Fragment>

      <TableRow className={classes.root} 
        onClick={(event) => departmentHandleClick(event,departmentTable)}
        key={departmentTable.code_value}
        >
        <TableCell>
          <Radio
            checked={isDepSelected(departmentTable)}
          /></TableCell>
          <TableCell>{departmentTable.code_name}</TableCell>
          <TableCell>{departmentTable.code_sort}</TableCell>
          <TableCell>{departmentTable.code_value}</TableCell>
          <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingLeft: 60 ,paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
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
                  {teamTable[departmentTable.code_value].map((team) => (
                    <TableRow key={team.code_value} 
                      onClick={(event) => teamHandleClick(event,team)}
                      key={team.code_value}
                    >
                      <TableCell>
                        <Radio checked={isTeamSelected(team)}/>
                      </TableCell>
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
function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        <TableCell></TableCell> 
        <TableCell>code_name</TableCell>
        <TableCell>code_sort</TableCell>
        <TableCell>code_value</TableCell>
        <TableCell>팀</TableCell>
        <TableCell></TableCell>
      </TableRow>
    </TableHead>
  )
}