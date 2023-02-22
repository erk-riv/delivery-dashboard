import React from "react";
import { Box, Typography, Stack, TextField, debounce, Autocomplete, 
         Grid, FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";
import parse from 'autosuggest-highlight/parse';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import Directions from "../global/directions";
import map from "../images/map-placeholder.png";
import '../global/directions.css';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { customersID } from "../data/mockData";

{/*DO NOT COMMIT THIS KEY TO THE GITHUB REPO UNLESS YOU WANT TO BECOME BROKE, 
FOR TEST PURPOSES ONLY  UNLESS YOU LIKE BEING BROKE*/}
const GOOGLE_MAPS_API_KEY = '';

function loadScript(src, position, id) {
    if (!position) {
        return;
    }
    const script = document.createElement('script');
    script.setAttribute('async', '');
    script.setAttribute('id', id);
    script.src = src;
    position.appendChild(script);
}

const autocompleteService = { current: null };


function Setup () {
    const [value, setValue] = React.useState(null);
    const [inputValue, setInputValue] = React.useState('');
    const [options, setOptions] = React.useState([]);
    const [from, setFrom] = React.useState('');
    const [speed, setSpeed] = React.useState('');
    const loaded = React.useRef(false);
    
    const handleChangeFrom = (event) => {
        setFrom(event.target.value);
    };
    
    const handleChangeSpeed = (event) => {
        setSpeed(event.target.value);
    };

    const handleSubmity = (e) => {
        e.preventDefault();
        // const id;
        // const deliveryDate;
        // const customer;
        // const total;
        // const status;
    }

    const customerName = customersID.map((option) => {
        const firstLetter = option.name[1].toUpperCase();
        return {
          firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
          ...option,
        };
      });


    if (typeof window !== 'undefined' && !loaded.current) {
        if (!document.querySelector('#google-maps')) {
            loadScript(
                `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`,
                document.querySelector('head'),
                'google-maps',  
            );
        }
        loaded.current = true;
    }

    const fetch = React.useMemo(
        () =>
            debounce((request, callback) => {
                autocompleteService.current.getPlacePredictions(request, callback);
            }, 400),
        [],
    );

    React.useEffect(() => {
        let active = true;

        if (!autocompleteService.current && window.google) {
            autocompleteService.current = new window.google.maps.places.AutocompleteService();
        }
        if (!autocompleteService.current) {
            return undefined;
        }
        if (inputValue === '') {
            setOptions(value ? [value] : []);
            return undefined;
        }

        fetch({ input: inputValue }, (results) => {
            if (active) {
                let newOptions = [];
                if (value) {
                    newOptions = [value];
                }
                if (results) {
                    newOptions = [...newOptions, ...results];
                }
                setOptions(newOptions);
            }
        });

        return () => {
            active = false;
        };
    }, [value, inputValue, fetch]);

    return (
        <Box>
            <Typography variant="h4" sx={{mb: 2}}>
                    Delivery Setup 
            </Typography>
            <Box sx={{borderTop: 1}}>
                <Grid container
                      justifyContent="flex-start"
                      direction="row"
                      marginTop={2}
                      display="flex"
                      >
                    <Grid item xs={8}>
                        <Grid container
                              justifyContent="space-between"
                              direction="row"
                              alignItems="center">
                                <Grid item xs={4}>
                                    <FormControl sx={{ minWidth: 300 }}>
                                        <InputLabel id="deliveryFrom">Delivery From</InputLabel>
                                        <Select
                                            labelId="deliveryFrom"
                                            id="deliveryFrom-select"
                                            value={from}
                                            label="Delivery Radius"
                                            onChange={handleChangeFrom}>
                                            <MenuItem value={10}>369 The Embarcadero, San Francisco, CA 94105</MenuItem>
                                            <MenuItem value={20}>3854 Geary Blvd, San Francisco, CA 94118</MenuItem>
                                            <MenuItem value={30}>1400 Ocean Ave, San Francisco, CA 94112</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={1}>
                                    <ArrowForwardIcon/>
                                </Grid>
                                <Grid item xs={4}>
                                    <Autocomplete
                                        id="google-map"
                                        sx={{ width: 300 }}
                                        getOptionLabel={(option) => (typeof option === 'string' ? option : option.description)}
                                        filterOptions={(x) => x}
                                        options={options}
                                        autoComplete
                                        includeInputInList
                                        filterSelectedOptions
                                        value={value}
                                        noOptionsText="No Locations"
                                        onChange={(event, newValue) => {
                                            setOptions(newValue ? [newValue, ...options] : options);
                                            setValue(newValue);
                                        }}
                                        onInputChange={(event, newInputValue) => {
                                            setInputValue(newInputValue);
                                        }}
                                        renderInput={(params) => (
                                            <TextField {...params} label="Delivery Location"  fullWidth />
                                        )}
                                        renderOption={(props, option) => {
                                            const matches = option.structured_formatting.main_text_matched_substrings || [];
                                            const parts = parse(
                                                option.structured_formatting.main_text,
                                                matches.map((match) => [match.offset, match.offset + match.length]),
                                            );

                                            return (
                                                <li {...props}>
                                                    <Grid container alignItems="center">
                                                        <Grid item sx={{display: 'flex', width: 44}}>
                                                            <LocationOnIcon sx={{color: 'text.secondary'}} />
                                                        </Grid>
                                                        <Grid item sx={{width: 'calc(100%-44px)', wordWrap: 'break-word'}}>
                                                            {parts.map((part, index) => (
                                                                <Box
                                                                    key={index}
                                                                    component="span"
                                                                    sx={{ fontWeight: part.highlight ? 'bold' : 'regular'}}>
                                                                        {part.text}
                                                                    </Box>
                                                            ))}
                                                            <Typography variant="body2" color="text.secondary">
                                                                {option.structured_formatting.secondary_text}
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </li>
                                            );
                                        }}
                                    ></Autocomplete>
                                </Grid>
                                <Grid item xs={4}
                                      marginTop={4}>
                                    <FormControl sx={{ minWidth: 300 }}>
                                            <InputLabel id="speed">Delivery Speed</InputLabel>
                                            <Select
                                                labelId="speed"
                                                id="speed-select"
                                                value={speed}
                                                label="Delivery Speed"
                                                onChange={handleChangeSpeed}>
                                                <MenuItem value={10}>URGENT - $70 Base</MenuItem>
                                                <MenuItem value={20}>SAME DAY - $45 Base</MenuItem>
                                                <MenuItem value={30}>NEXT DAY - $35 Base</MenuItem>
                                                <MenuItem value={40}>FUTURE - $30 Base</MenuItem>
                                            </Select>
                                        </FormControl>
                                </Grid>
                                <Grid item xs={4}
                                      marginTop={4}>
                                    <Autocomplete
                                        id="customer"
                                        options={customerName.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                                        groupBy={(option) => option.firstLetter}
                                        getOptionLabel={(option) => option.name}
                                        sx={{ width: 300 }}
                                        renderInput={(params) => <TextField {...params} label="Customer" />}
                                    />
                                </Grid>
                                <Grid item xs={4}
                                      marginTop={2}>
                                    <Button variant="outlined" sx={{width: 300, mt: 2, color: "white", backgroundColor: "black",}}>Submit</Button>
                                </Grid>
                                <Grid item xs={12}
                                       marginTop={4}>
                                    <Typography variant="h6" sx={{mb: 2}}>Total: $71.80 (SAMEDAY + ($0.90/mile x 4 miles))</Typography>
                                </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={4}>
                    <img class="map" src={map} alt="map" draggable="false"/>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}
export default Setup;

