import React, { Fragment, useEffect, useState } from 'react'
import CombineWithStyles from '../style/CombineWithStyles';
import CommonStyle from '../style/CommonStyle';
import { get } from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import { TableSortLabel, Radio, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@material-ui/core';
import {Tooltip, Toolbar, Grid, Collapse, IconButton, Box, Typography } from '@material-ui/core'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import clsx from "clsx";
import { Company_code_Create,Company_code_Update,Company_code_Delete } from '.'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
const styles = theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
});
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

function Company_code_read(props) {
  const { classes } = props
  const [company_code, setCompany_code] = useState('')
  const [location, setLocation] = useState({
    table: [],
    select: { code_value: "" }
  })
  const [department, setDepartment] = useState({
    table: [],
    view: [],
    select: { code_value: "" }
  })
  const [team, setTeam] = useState({
    table: [],
    view: [],
    select: { code_value: "" }
  })
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selectValue,setSelectValue] = useState(0)

  //첫실행시
  useEffect(() => {
    getCompany_code().then((response) => {
      setCompany_code(response.data)
    }).catch(error => {
      console.log("useeffect getCompany_code error : ", error)
    })
    return () => {
      console.log("end")
    }
  }, [])

  useEffect(() => {
    if (company_code !== "") {
      var loc = []
      var dep = []
      var tea = []
      var data = {}
      company_code.forEach(d => {
        if (d.code_id === "location") {
          loc.push(d)
        }
        else if (d.code_id === "department") {
          dep.push(d)
        }
        else if (d.code_id === "team") {
          tea.push(d)
        }
      })
      setLocation({
        ...location,
        "table" : loc
      })
      setDepartment({
        ...department,
        "table" : dep
      })
      dep.forEach(x => {
        data[x.code_value] = []
        tea.forEach(y => {
          if (x.code_value === y.code_option) {
            data[x.code_value].push(y)
          }
        })
      })
      setTeam({
        ...team,
        "table" : data
      })
    }
  }, [company_code])

  useEffect(() => {
    if (location.select.code_value.length) {
      var { table } = department
      var view = []
      table.map(d => {
        if (d.code_option === location.select.code_value) {
          view.push(d)
        }
      })
      setDepartment({
        ...department,
        "view": view,
        "select": { code_value: "" }
      })

    }
  }, [location.select])

  const getCompany_code = () => {
    const uri = '/company_code'
    return get(uri)
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  //radio click event
  const locationHandleClick = (event,_location) =>{
    setLocation({
      ...location,
      "select" : _location
    })
    setSelectValue(1)
    setDepartment({
      ...department,
      "select": { code_value: "" }
    })
    setTeam({
      ...team,
      "select": { code_value: "" }
    })
  }
  const departmentHandleClick = (event, _department) => {
    let newSelected = department.select

    if (_department.code_value !== department.select.code_value) {
      newSelected = _department
      setDepartment({
        ...department,
        "select": newSelected
      })
      setSelectValue(2)
      setTeam({
        ...team,
        "select": { code_value: "" }
      })
    } else {
      setDepartment({
        ...department,
        "select": newSelected
      })
    }
  }
  const teamHandleClick = (event, _team) => {
    let newSelected = team.select

    if (department.select.code_value === _team.code_option) {
      if (_team.code_value !== team.select.code_value) {
        newSelected = _team
        setTeam({
          ...team,
          ["select"]: newSelected
        })
        setSelectValue(3)
      }
    }
    else {

    }

  }

  const isLocationSelected = (_location) => {
    return (location.select.code_value.indexOf(_location.code_value) !== -1)
  }
  const isDepSelected = (_department) => {
    return (department.select.code_value.indexOf(_department.code_value) !== -1)
  }
  const isTeamSelected = (_team) => {
    return (team.select.code_value.indexOf(_team.code_value) !== -1)
  }

  const setLocationHead = () => {
    return (
      <TableRow>
        <TableCell></TableCell>
        <TableCell>code_name</TableCell>
        <TableCell>code_value</TableCell>
      </TableRow>
    )
  }

  const setLocationBody = (loc) => {
    return (
      <TableBody>
        {loc.map(d => {
          return(
          <TableRow
            onClick={(event) => locationHandleClick(event, d)}
            key={d.code_value}
          >
            <TableCell>
              <Radio
                checked={isLocationSelected(d)}
              /></TableCell>
            <TableCell>{d.code_name}</TableCell>
            <TableCell>{d.code_value}</TableCell>
          </TableRow>
        )})}
      </TableBody>
    )
  }
  const toolbarTitle = () =>{
    switch(selectValue){
      case 1:
        return(<>{location.select.code_name}</>)
      case 2:
        return(<>{location.select.code_name} - {department.select.code_name}</>)
      case 3:
        return(<>{location.select.code_name} - {department.select.code_name} - {team.select.code_name}</>)
    }
  }
  const enhancedTableToolbar = () => {
    return(
    <Toolbar className={clsx(classes.toolbarRoot, { [classes.highlight]: selectValue > 0 })}>
      <Typography
        className={classes.title}
        color="inherit"
        variant="subtitle1"
        component="div"
      >{toolbarTitle()}
      </Typography>
    </Toolbar>
    )
  }

  const radioUnchecked = () => {
    setSelectValue(0)
    setLocation({
      ...location,
      ["select"]: { code_value: "" }
    })
    setDepartment({
      ...department,
      ["select"]: { code_value: "" }
    })
    setTeam({
      ...team,
      ["select"]: { code_value: "" }
    })
  }

  return (
    <Fragment>
      <Tooltip title="전체 선택 해제">
        <IconButton aria-label="radioUnchecked" onClick={radioUnchecked}>
          <RadioButtonUncheckedIcon fontSize="large"></RadioButtonUncheckedIcon>
        </IconButton>
      </Tooltip>
      <Company_code_Create
        select={selectValue}
        location={location}
        department={department}
        team={team}
      />
      <Company_code_Update
        select={selectValue}
        location={location.select}
        department={department.select}
        team={team.select}
      />
      <Company_code_Delete
        select={selectValue}
        location={location.select}
        department={department.select}
        team={team.select}
      />
      {enhancedTableToolbar(selectValue)}
      <Grid container spacing={2}>
        {/* toolbar location */}
        <Grid item xs={12} sm={4}>
          {/* <Paper className={classes.paper}> */}
            <TableContainer component={Paper}>
            <Typography variant="h6" gutterBottom component="div">위치</Typography>
              <Table size="small">
                <TableHead>
                  {setLocationHead()}
                </TableHead>
                  {location.table ? setLocationBody(location.table) : ""}
              </Table>
            </TableContainer>
          {/* </Paper> */}
        </Grid>
        <Grid item xs={12} sm={8}>
          <TableContainer component={Paper}>
            <Typography variant="h6" gutterBottom component="div">부서</Typography>
            <Table size="small" aria-label="simple table">
              <EnhancedTableHead
                classes={classes}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {location.select.code_value.length ?
                  stableSort(department.view, getComparator(order, orderBy)).map((row) => (
                    <Row
                      key={row.code_value}
                      departmentTable={row}
                      teamTable={team.table}
                      isDepSelected={isDepSelected}
                      departmentHandleClick={departmentHandleClick}
                      isTeamSelected={isTeamSelected}
                      teamHandleClick={teamHandleClick} />
                  )) : ""}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Fragment>
  )
}



function Row(props) {
  const { departmentTable, teamTable } = props
  const { isDepSelected, isTeamSelected, departmentHandleClick, teamHandleClick } = props
  const [open, setOpen] = React.useState(false)
  const classes = useRowStyles()
  console.log("row : ", departmentTable)
  console.log("team : ", teamTable)

  // const isDepartmentSelected = isDepSelected(departmentTable.code_value)
  // const isTeamSelected = isDepSelected(team.code_value)
  return (
    <React.Fragment>
      <TableRow className={classes.root}
        onClick={(event) => departmentHandleClick(event, departmentTable)}
        key={departmentTable.code_value}
      >
        <TableCell>
          <Radio
            checked={isDepSelected(departmentTable)}
          /></TableCell>
        <TableCell>{departmentTable.code_name}</TableCell>
        <TableCell>{departmentTable.code_description}</TableCell>
        <TableCell>{departmentTable.code_value}</TableCell>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingLeft: 60, paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
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
                      onClick={(event) => teamHandleClick(event, team)}
                      key={team.code_value}
                    >
                      <TableCell>
                        <Radio checked={isTeamSelected(team)} />
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
        <TableCell>code_description</TableCell>
        <TableCell>code_value</TableCell>
        <TableCell
          key='code_sort'
          sortDirection={orderBy === 'code_sort' ? order : false}
        >
          <TableSortLabel
            active={orderBy === 'code_sort'}
            direction={orderBy === 'code_sort' ? order : 'asc'}
            onClick={createSortHandler('code_sort')}
          >
            sort
            {orderBy === 'sort' ? (
              <span className={classes.visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </span>
            ) : null}
          </TableSortLabel>
        </TableCell>

        <TableCell></TableCell>
      </TableRow>
    </TableHead>
  )
}

export default CombineWithStyles(styles, CommonStyle)(Company_code_read);