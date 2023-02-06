import React from 'react';

import { Box, Typography, Stack, TextField} from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

function Lookup () {
    const [value, setValue] = React.useState(new Date());
    const handleDateChange = (newValue) => {
        setValue(newValue);
    }

    return (
        <Box sx={{backgroundColor: "white"}}>
        <Typography variant="h4" sx={{mb: 2}}>
           Delivery Lookup 
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3}>
                <DesktopDatePicker
                    label="Select Date"
                    inputFormat="MM/dd/yyyy"
                    value={value}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField {...params} />}
                />
            </Stack>
        </LocalizationProvider>
        </Box>
    )
}

export default Lookup;