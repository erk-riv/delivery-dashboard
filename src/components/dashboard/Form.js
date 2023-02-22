import React, {useEffect, useState} from "react";
import { Box, Typography } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import { mockData } from "../data/mockData";
//import posts.js from api folder
import api from "../../api/posts";

const Form = () => {
    const columns = [{field: "id", headerName: "Order Number", flex: 0.5},
                     {field: 'deliveryDate', headerName: 'Delivery Date', flex: 1},  
                     {field: "customer", headerName: "Ship To" , flex: 1}, 
                     {field: "total", headerName: "Total", flex: 1}, 
                     {field: "status", headerName: "Status", flex: 1}];

    const [pageSize, setPageSize] = React.useState(12);
    const [delivery, setDelivery] = React.useState([]);

    useEffect(() => {
      const fetchPosts = async () => {
        try {
          const response = await api.get('/delivery');
          setDelivery(response.data);
        } catch (err) {
            if (err.response) {
            //Not in the 200 response range
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
            } else {
              console.log(`Error, ${err.message}`);
            }
        }}
        fetchPosts();
      }, [])

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
              rows={delivery}
              columns={columns}
              disableSelectionOnClick
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              rowsPerPageOptions={[12, 24, 50, 100]}
              pagination
              experimentalFeatures={{ newEditingApi: true }}
              autoHeight
            />
          </Box>
        
    );
}

export default Form;