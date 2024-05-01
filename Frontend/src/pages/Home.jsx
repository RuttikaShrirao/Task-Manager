import * as React from 'react';
// import requestAuthenticatedAPI from '../utils/utilityFuncs'
import {API_URL,TOKEN_KEY} from '../utils/constants'


// table
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// drawer
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';

// css
import "../CSS/Drawer.css"


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export default function Home() {

  // ------ useState ---------//
  const[taskData, setTask_data]= React.useState([])

  const [tableData, setTableData]=React.useState({
                                                  title:'',
                                                  description:'',
                                                  date:''
                                                })
                                                
// drawer
  const [open, setOpen] = React.useState(false);

  //------------- functions-------------//
  // drawer
  const toggleDrawer = (newOpen) => () => {
    console.log(newOpen)
    setOpen(newOpen);
  };
// Api data
const titleHandler=(e)=>{
  setTableData({...tableData,title:(e.target.value)})
console.log({...tableData,title:(e.target.value)})
}

const descriptionHandler=(e)=>{
  setTableData({...tableData,description:(e.target.value)})
  console.log({...tableData,description:(e.target.value)})
}

const dateHandler=(e)=>{
  setTableData({...tableData, date:(e.target.value)})
  console.log({...tableData, date:(e.target.value)})
}

  const getDataFromApi=()=>{
    return fetch("http://localhost:5000/",
    {
        headers:{
            'Content-Type': 'application/json',
        }
    })
    .then((response)=>response.json())
    .then((data)=>{
      // console.log(data.getData)
      setTask_data(data.getData)
    })
  }


const createTask=()=>{
  const token = localStorage.getItem('token');
  fetch(`${API_URL}/create-task`,
      {
          method:'POST',
          body:JSON.stringify({title:tableData.title, description:tableData.description, deuDate:tableData.date}),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
      })
     .then(res=>res.json())
     .then(data=>{
      console.log(data.status_code)
      if(data.status_code==200){
        console.log('mmm')
        setOpen(false)
      }
     })
}

const deleteHandler=()=>{
  const token = localStorage.getItem('token');
  console.log(taskData[0]._id)
  fetch(`${API_URL}/delete/${taskData[0]._id} `,
  {
      method:'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
  })
}


  const DrawerList = (
    <Box  role="presentation" onClick={toggleDrawer(true)}>
    <div className='Drawer'>
    <h2>Title</h2>
      <input onChange={titleHandler} placeholder='Title'/>
      <h3>Description</h3>
      <input className='Drawer-description' onChange={descriptionHandler}/>
      <input type='date' onChange={dateHandler} placeholder='Date' />
      <Button  variant="contained" href="#contained-buttons" onClick={createTask}>
        Add
      </Button>
      </div>
    </Box>
  );
 
// useeffect
 React.useEffect(()=>{
    getDataFromApi()
  },[])

  return (
    <div >
     <Button onClick={toggleDrawer(true)}>+Create Task</Button>
   
      <Drawer open={open} onClose={toggleDrawer(false)}  anchor={'right'}>
        {DrawerList}
      </Drawer>

      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell align="right">Title</StyledTableCell>
            <StyledTableCell align="right">Date</StyledTableCell>
            <StyledTableCell align="right">Description</StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {taskData.map((row,index) => (
            <StyledTableRow key={index}>
           
              <StyledTableCell component="th" scope="row">
                {index+1}
              </StyledTableCell>
              <StyledTableCell align="right">{row.title}</StyledTableCell>
              <StyledTableCell align="right">{row.deuDate}</StyledTableCell>
              <StyledTableCell align="right">
             {row.description}
              </StyledTableCell>
              <StyledTableCell align="right">

              <Button onClick={deleteHandler} variant="contained" color='error' href="#contained-buttons">
                delete
              </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

      
    </div>
  );
}