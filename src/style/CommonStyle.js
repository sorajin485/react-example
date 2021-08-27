import { lighten } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

const CommonStyle = (theme) => ({
  formControl: {
    marginBottom: theme.spacing(1),
    minWidth: theme.spacing(20),
    background: 'white',
  },
  background: {
    backgroundColor:grey[300],
    padding:theme.spacing(3),
    minHeight : 'calc(100vh - 123px)'
  },
  paper: {
    width: "100%",
    minHeight:"75vh",
    marginBottom: theme.spacing(2)
  },
  tableHead : {
    backgroundColor : grey[200]
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1
  },
  toolbarRoot: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    display : 'none'
  },
  highlight: {
    display : 'flex',
    color: theme.palette.secondary.main,
    backgroundColor: lighten(theme.palette.secondary.light, 0.85)
  },
  title: {
    flex: "1 1 100%"
  },
  chipInput : {
    float:'right',
    marginRight : '10px',
    backgroundColor : 'white',
    padding : '7px',
    marginLeft : '5px'
  },
  pagination: {
    float:'right',
    marginLeft : theme.spacing(1)
  }
})

export default CommonStyle;