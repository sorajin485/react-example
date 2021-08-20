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

// function Row(props) {
//   const { row } = props.row
//   const { team_row } = props.team
//   const [open, setOpen] = React.useState(false)
//   const classes = useRowStyles()

//   return (
//     <React.Fragment>
//       <TableRow className={classes.root}>
//         <TableCell>
//           <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
//             {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
//           </IconButton>
//         </TableCell>
//         {/* <TableCell component="th" scope="row">
//           {row.code_id}
//         </TableCell>
//            <TableCell component="th" scope="row">{row.code_id}</TableCell> */}
//            <TableCell align="right">{row.code_name}</TableCell>
//            <TableCell align="right">{row.code_sort}</TableCell>
//            <TableCell align="right">{row.code_value}</TableCell>
//            <TableCell align="right">{row.protein}</TableCell>
//       </TableRow>
//       <TableRow>
//         <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
//           <Collapse in={open} timeout="auto" unmountOnExit>
//             <Box margin={1}>
//               <Typography variant="h6" gutterBottom component="div">
//                 History
//               </Typography>
//               <Table size="small" aria-label="purchases">
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Date</TableCell>
//                     <TableCell>Customer</TableCell>
//                     <TableCell align="right">Amount</TableCell>
//                     <TableCell align="right">Total price ($)</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
                  
//                   {/* {row.history.map((historyRow) => (
//                     <TableRow key={historyRow.date}>
//                       <TableCell component="th" scope="row">
//                         {historyRow.date}
//                       </TableCell>
//                       <TableCell>{historyRow.customerId}</TableCell>
//                       <TableCell align="right">{historyRow.amount}</TableCell>
//                       <TableCell align="right">
//                         {Math.round(historyRow.amount * row.price * 100) / 100}
//                       </TableCell>
//                     </TableRow>
//                   ))} */}
//                 </TableBody>
//               </Table>
//             </Box>
//           </Collapse>
//         </TableCell>
//       </TableRow>
//     </React.Fragment>
//   );
// }

// Row.propTypes = {
//   row: PropTypes.shape({
//     calories: PropTypes.number.isRequired,
//     carbs: PropTypes.number.isRequired,
//     fat: PropTypes.number.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         amount: PropTypes.number.isRequired,
//         customerId: PropTypes.string.isRequired,
//         date: PropTypes.string.isRequired,
//       }),
//     ).isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     protein: PropTypes.number.isRequired,
//   }).isRequired,
// };

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
  createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
  createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
  createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
];

export default function CollapsibleTable() {
  const [company_code, setCompany_code] = useState('')
  const [location, setLocation] = useState([])
  const [department, setDepartment] = useState([])
  const [team, setTeam] = useState([])
  const [open, setOpen] = useState(false)
  const classes = useRowStyles()
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
  const setTableHead = () => {
    return (
      <TableHead>
        <TableRow>
          <TableCell></TableCell>
          <TableCell align="right">code_id</TableCell>
          <TableCell align="right">Fat&nbsp;(g)</TableCell>
          <TableCell align="right">Carbs&nbsp;(g)</TableCell>
          <TableCell align="right">Protein&nbsp;(g)</TableCell>
        </TableRow>
      </TableHead>
    )
  }
  const setTableBody = (company_code, team) => {
    return (
      company_code.map((row) => (
        setRows(row,team)
        //<Row key={row.code_name} row={row} team={team} />
        // <TableRow key={row.name}>
        //   <TableCell component="th" scope="row">{row.code_id}</TableCell>
        //   <TableCell align="right">{row.code_name}</TableCell>
        //   <TableCell align="right">{row.code_sort}</TableCell>
        //   <TableCell align="right">{row.code_value}</TableCell>
        //   <TableCell align="right">{row.protein}</TableCell>
        // </TableRow>
      ))
    )
  }

  const getCompany_code = () => {
    const uri = '/company_code'
    return get(uri)
  }
  const setRows = (department,team) => {
    const row = department
    const team_row = team
    
    return (
      <React.Fragment>
        <TableRow className={classes.root}>
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.code_id}
          </TableCell>
             <TableCell component="th" scope="row">{row.code_id}</TableCell>
             <TableCell align="right">{row.code_name}</TableCell>
             <TableCell align="right">{row.code_sort}</TableCell>
             <TableCell align="right">{row.code_value}</TableCell>
             <TableCell align="right">{row.protein}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Typography variant="h6" gutterBottom component="div">
                  History
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Customer</TableCell>
                      <TableCell align="right">Amount</TableCell>
                      <TableCell align="right">Total price ($)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    
                    {/* {row.history.map((historyRow) => (
                      <TableRow key={historyRow.date}>
                        <TableCell component="th" scope="row">
                          {historyRow.date}
                        </TableCell>
                        <TableCell>{historyRow.customerId}</TableCell>
                        <TableCell align="right">{historyRow.amount}</TableCell>
                        <TableCell align="right">
                          {Math.round(historyRow.amount * row.price * 100) / 100}
                        </TableCell>
                      </TableRow>
                    ))} */}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  return (
    <TableContainer component={Paper}>
      
      <Typography variant="h6" gutterBottom component="div">
          부서
      </Typography>
      <Table aria-label="collapsible table">
        {setTableHead()}
        <TableBody>
          {company_code ? setTableBody(company_code,team) : ""}
        </TableBody>
      </Table>
    </TableContainer>
  );
}