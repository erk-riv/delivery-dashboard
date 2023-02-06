import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
//import "react-pro-sidebar/dist/css/styles.css";
import { Box, Typography, IconButton } from "@mui/material";
import { Link } from "react-router-dom";

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");
    return(
        <Box
            sx={{}}>

        </Box>
    )};

    export default Sidebar;