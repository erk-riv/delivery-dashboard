import './Dashboard.css';
import { Routes, Route } from 'react-router-dom';
import Topbar from './components/global/Topbar';
import Sidebar from './components/global/Sidebar';
import Form from './components/dashboard/Form';
import Setup from './components/dashboard/Setup';
import Lookup from './components/dashboard/Lookup';
// import Team from './components/Team';
// import Team from './components/Team';
// import Invoices from './components/Invoices';
// import Contacts from './components/Contacts';
import { Box, Typography, Grid } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';


function App() {
  // const columns = [{field: 'id', headerName: 'Order Number'},
  //                  {field: 'deliveryDate', headerName: 'Delivery Date'},  
  //                  {field: 'customer', headerName: 'Ship To'}, 
  //                  {field: 'total', headerName: 'Total'}, 
  //                  {field: 'status', headerName: 'Status'}];
  
  // const rows = [
  //   { id: 897654321, deliveryDate: '2021-08-01', customer: 'John Doe', total: 100, status: 'Pending' },
  //   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  //   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  //   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  //   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  //   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  //   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  //   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  //   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  //   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  // ];

  return (
    <div className="Dashboard">
      <main className='content'>
        <Topbar />
        <Grid m="20px"
              direction="row"
              container style={{gap: "170px"}}
              justifyContent="flex-start"
              paddingTop={6}
              >
          <Grid item xs={8}>
            <Setup />
          </Grid>
          <Grid item xs={3}>
            <Lookup />
          </Grid>
        </Grid>
          <Box m="20px">
            <Form />
          </Box>
      </main>
    </div>
  );
}

export default App;