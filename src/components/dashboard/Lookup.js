import React from 'react';
import { Box, Typography, Stack, TextField, Button} from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

function Lookup () {
    const [value, setValue] = React.useState(new Date());
    const handleDateChange = (newValue) => {
        setValue(newValue);
    }

    return (
        <Box>
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
        <Button variant="outlined" sx={{mt: 2, color: "white", backgroundColor: "black",}}>Search</Button>
        </Box>
    )
}

export default Lookup;