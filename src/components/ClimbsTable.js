import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Card, CardContent, CardMedia, Checkbox,
  Table, TableBody, TableCell, TableHead,
  TableRow, Typography, Divider, IconButton, Button
} from '@material-ui/core';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';

const useStyles = makeStyles(theme => ({
  card: {
    marginBottom: 25,
    overflowX: 'auto',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  typography: {
    align: 'center',
  },
}));

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "#3F51B5",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

const Problem = props => {
  const currentDate = new Date();
  const [flashed, setFlashed] = useState(props.problem.flashed)
  const [project, setProject] = useState(props.problem.project)
  const [attempts, setAttempts] = useState(props.problem.attempts)
  const [sends, setSends] = useState(props.problem.sends)
  const setDate = new Date(props.problem.dateSet);
  const lessThan7DaysOld = (currentDate - setDate) < 678017049

  props.problem.attempts = attempts
  props.problem.sends = sends
  props.problem.flashed = flashed
  props.problem.project = project

  return (props.problem.number >= 500 ? null : <StyledTableRow>
    <StyledTableCell align="center" width="150px">
      <Card style={{ width: '100%' }} >
        <CardContent style={{ backgroundColor: '#eeeeee' }}>
          <Card>
            <Typography variant="body2" style={{ backgroundColor: 'white' }}>{props.problem.number}</Typography>
            <Divider />
            <Typography variant="subtitle2" style={{ backgroundColor: 'white' }}>
              {lessThan7DaysOld ? "?" : props.problem.grade}
              {/* {props.problem.grade} */}
            </Typography>
            <Divider />
            <Typography style={{ backgroundColor: `${props.problem.color}`, height: '20px' }} ></Typography>
          </Card>
        </CardContent>
      </Card>
    </StyledTableCell>
    <StyledTableCell align="center">
      <Typography variant="subtitle2">
        <IconButton onClick={() => setAttempts(attempts - 1)} color="secondary">
          <Remove fontSize="small" />
        </IconButton>
        {props.problem.attempts}
        <IconButton onClick={() => setAttempts(attempts + 1)} color="primary">
          <Add fontSize="small" />
        </IconButton>
      </Typography>
    </StyledTableCell>
    <StyledTableCell align="center">
      <Typography variant="subtitle2">
        <IconButton onClick={() => setSends(sends - 1)} color="secondary"><Remove fontSize="small" /></IconButton>
        {props.problem.sends}
        <IconButton onClick={() => setSends(sends + 1)} color="primary"><Add fontSize="small" />
        </IconButton>
      </Typography>
    </StyledTableCell>
    <StyledTableCell align="center">
      {<Checkbox checked={props.problem.flashed} onClick={() => props.problem.flashed ? setFlashed(false) : setFlashed(true)} />}
    </StyledTableCell>
    <StyledTableCell align="center">
      {<Checkbox color="primary" checked={project} onClick={() => props.problem.project ? setProject(false) : setProject(true)} />}
    </StyledTableCell>
  </StyledTableRow>)
}


export default props => {
  
  const classes = useStyles();
  const problems = props.problems;

  const problemList = (wall) => {
    let list = problems.filter(problem => problem.area === wall).sort((a, b) => a.number - b.number).map(problem => {
      return <Problem problem={problem} key={problem._id} classes={classes} />
    })

    let latestSet = problems.filter(problem => problem.area === wall).reduce((a, b) => a.dateSet > b.dateSet ? a.dateSet : b.dateSet)
    // const setDate = new Date(props.problem.dateSet);
    // const lessThan7DaysOld = (currentDate - setDate) < 678017049


    return <>
      <Typography align="center" variant='h4' gutterBottom>
        {wall.toUpperCase()}
        <Button onClick={() => console.log(wall)}>Update Set</Button>
      </Typography>

      <Typography variant='caption' gutterBottom>{(new Date(latestSet)).toLocaleDateString()}</Typography>
      <Card className={classes.card}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center"># | Grade | Color</StyledTableCell>
              <StyledTableCell align="center">Attempts</StyledTableCell>
              <StyledTableCell align="center">Sends</StyledTableCell>
              <StyledTableCell align="center">Flash</StyledTableCell>
              <StyledTableCell align="center">Project</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list}
          </TableBody>
        </Table>
      </Card>
    </>
  }

  const cave = problemList('cave');
  const corridor = problemList('corridor');
  const northeast = problemList('north east');
  const slab = problemList('slab');
  const southeast = problemList('south east');
  const southwest = problemList('south west');
  const toprope = problemList('top rope');
  const westwall = problemList('west wall');
  const netlify = problemList('netlify');

  return (
    <>
      <Typography align="center" variant='h4' gutterBottom>ROUTESETTING MAP</Typography>
      <Card className={classes.card}>
        <CardMedia className={classes.media} image="images/brgmap.jpg" title="brgmap" />
      </Card>
      {netlify}
      {cave}
      {corridor}
      {northeast}
      {slab}
      {southeast}
      {southwest}
      {westwall}
      {toprope}
    </>
  )
}