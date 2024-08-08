import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { FaCogs, FaFileAlt, FaChartBar, FaTable } from 'react-icons/fa';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import Collapse from '@mui/material/Collapse';
import './Home.css';
import {Button} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import {useNavigate} from "react-router-dom";
import ConstructionIcon from '@mui/icons-material/Construction';
import SettingsIcon from '@mui/icons-material/Settings';
import EarbudsIcon from '@mui/icons-material/Earbuds';
import ReorderIcon from '@mui/icons-material/Reorder';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import HomeIcon from '@mui/icons-material/Home';


const Home = ({ children }) => {

    const drawerWidth = 240;
    const navigate = useNavigate();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [isCustomOpen, setCustomOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const toggleCustom = () => setCustomOpen(!isCustomOpen);

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('username');
        navigate('/');
    };

    const username = localStorage.getItem('username');

    const openedMixin = (theme) => ({
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        overflowX: 'hidden',
    });

    const closedMixin = (theme) => ({
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: `calc(${theme.spacing(7)} + 1px)`,
        [theme.breakpoints.up('sm')]: {
            width: `calc(${theme.spacing(8)} + 1px)`,
        },
    });

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    }));

    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
    })(({ theme, open }) => ({
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        backgroundColor: '#24234F', // Set the background color here
        ...(open && {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    }));

    const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
        ({ theme, open }) => ({
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap',
            boxSizing: 'border-box',
            ...(open && {
                ...openedMixin(theme),
                '& .MuiDrawer-paper': openedMixin(theme),
            }),
            ...(!open && {
                ...closedMixin(theme),
                '& .MuiDrawer-paper': closedMixin(theme),
            }),
        }),
    );


    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <ReorderIcon     />
                    </IconButton>
                    <LocalShippingIcon sx={{ mr: 1  }} />
                    <Typography variant="h6" noWrap component="div"  sx={{ flexGrow: 1  }}>
                         My Bom
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
                        {username && (
                            <Typography variant="h6" noWrap component="div" sx={{ marginRight: -1 }}>
                                Bonjour {username}
                            </Typography>
                        )}
                        <Button

                            color="inherit"
                            onClick={handleLogout}
                            startIcon={<PowerSettingsNewIcon sx={{ fontSize: 3 }} />}
                        >

                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />

                <List>
                    <ListItem button
                          sx={{
                              minHeight: 48,
                              justifyContent: open ? 'initial' : 'center',
                              px: 4.5,
                          }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                                color:'#24234F',
                            }}
                        >
                            <HomeIcon  />
                        </ListItemIcon>
                        <ListItemText primary="Accueil" sx={{ color: '#24234F', display: open ? 'block' : 'none' }} />
                    </ListItem>
                    <ListItem button
                          sx={{
                              minHeight: 48,
                              justifyContent: open ? 'initial' : 'center',
                              px: 4.5,
                          }}
                              component="a" href="/tournees"
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                                color:'#24234F',
                            }}
                        >
                            <EarbudsIcon  />
                        </ListItemIcon>
                        <ListItemText primary="Gestion des tournées" sx={{ color: '#24234F', display: open ? 'block' : 'none' }} />
                    </ListItem>
                    <ListItem button
                          sx={{
                              minHeight: 48,
                              justifyContent: open ? 'initial' : 'center',
                              px: 4.5,
                          }}
                              component="a" href="/vehicules"
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                                color:'#24234F',
                            }}
                        >
                            <LocalShippingIcon  />
                        </ListItemIcon>
                        <ListItemText primary="Gestion des véhicules" sx={{ color: '#24234F', display: open ? 'block' : 'none' }} />
                    </ListItem>
                    <ListItem button
                          sx={{
                              minHeight: 48,
                              justifyContent: open ? 'initial' : 'center',
                              px: 4.5,
                          }}
                              component="a" href="/pannes-vehicules"
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                                color:'#24234F',
                            }}
                        >
                            <ConstructionIcon  />
                        </ListItemIcon>
                        <ListItemText primary="Gestion des pannes" sx={{ color: '#24234F', display: open ? 'block' : 'none' }} />
                    </ListItem>
                    <ListItem button onClick={toggleCustom}
                          sx={{
                              minHeight: 48,
                              justifyContent: open ? 'initial' : 'center',
                              px: 4.5,
                          }}


                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                                color:'#24234F',
                            }}
                        >
                            <SettingsIcon  />
                        </ListItemIcon>
                        <ListItemText primary="Paramètres" sx={{ color: '#24234F', display: open ? 'block' : 'none' }} />
                        {open ? (isCustomOpen ? <ExpandLess /> : <ExpandMore />) : null}
                    </ListItem>
                    <Collapse in={isCustomOpen && open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button sx={{ pl: 9 }} component="a" href="/conducteurs">
                                <ListItemText primary="Conducteurs" sx={{ color: '#24234F' }} />
                            </ListItem>
                            <ListItem button sx={{ pl: 9 }} component="a" href="/volumes">
                                <ListItemText primary="Gabarits" sx={{ color: '#24234F' }} />
                            </ListItem>
                            <ListItem button sx={{ pl: 9 }} component="a" href="/secteurs">
                                <ListItemText primary="Secteurs" sx={{ color: '#24234F' }} />
                            </ListItem>
                            <ListItem button sx={{ pl: 9 }} component="a" href="/radios">
                                <ListItemText primary="N°Radios" sx={{ color: '#24234F' }} />
                            </ListItem>
                            <ListItem button sx={{ pl: 9 }} component="a" href="/categories-pannes">
                                <ListItemText primary="Pannes" sx={{ color: '#24234F' }} />
                            </ListItem>
                        </List>
                    </Collapse>
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                {children}
            </Box>
        </Box>
    );

};

export default Home;
