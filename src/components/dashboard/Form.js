import { Box, Typography } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import { mockData } from "../data/mockData";

const Form = () => {
    const columns = [{field: "id", headerName: "Order Number"},
                     {field: 'deliveryDate', headerName: 'Delivery Date'},  
                     {field: "customer", headerName: "Ship To", width: 200}, 
                     {field: "total", headerName: "Total"}, 
                     {field: "status", headerName: "Status"}];
    
    return (
       
          <Box 
            m="40px 0 0 0"
            height="75vh"
            sx={{
              "& .MuiDataGrid-root": {
                  border: "none",
              },
              "& .MuiDataGrid-cell": {
                  borderBottom: "none"
              },
              "& .name-column--cell": {
                  color: "#887c75",
              },
              "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#887c75",
                  borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                  backgroundColor: "#ffffff",
              },
              "& .MuiDataGrid-footerContainer": {
                  borderTop: "none",
                  backgroundColor: "#ffffff",
              }, 
              "& .MuiCheckbox-root": {
                color: `#ffffff`,
              },
          }}>
            <DataGrid
              rows={mockData}
              columns={columns}
              
              
              disableSelectionOnClick
              experimentalFeatures={{ newEditingApi: true }}
              autoHeight
            />
          </Box>
        
    );
}

export default Form;