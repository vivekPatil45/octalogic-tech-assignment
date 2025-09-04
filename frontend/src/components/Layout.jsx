import {
    AppBar,
    Toolbar,
    Box,
    Button,
    Container,
    Typography,
    
} from "@mui/material";
import { NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "@mui/material/styles";

function Layout({ children }) {
    const theme = useTheme();
    const navItems = [
        { title: "Home", path: "/", icon: <HomeIcon /> },
        { title: "Bookings", path: "/all-bookings", icon: <ListAltIcon /> },
        { title: "Create", path: "/create-booking", icon: <AddCircleOutlineIcon /> },
    ];

    return (
        <Container maxWidth="lg">
            {/* Navbar */}
            <AppBar
                position="static"
                color="transparent"
                elevation={0}
                sx={{
                    borderBottom: "1px solid",
                    borderColor: "divider",
                    // backgroundColor: "background.paper",
                }}
            >
                <Toolbar
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        justifyContent: "space-between",
                        alignItems: "center",
                        py: 2,
                    }}
                >
                    
                    <Box
                        component={NavLink}
                        to="/"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            textDecoration: "none",
                            gap: 1.5,
                        }}
                    >
                        <Box
                            component="img"
                            src="https://octalogic.in/images/logos/octalogic.svg"
                            alt="navbar"
                            sx={{
                                height: 40,
                                width: 40,
                                display: { xs: "none", md: "block" },
                            }}
                        />
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: "bold",
                                color: theme.palette.primary.main,
                            }}
                        >
                            MyBookingApp
                        </Typography>
                    </Box>

                
                    <Box
                        sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: { xs: 1, md: 2 },
                        mt: { xs: 2, md: 0 },
                        }}
                    >
                        {navItems.map((item) => (
                            <Button
                                key={item.path}
                                component={NavLink}
                                to={item.path}
                                startIcon={item.icon}
                                sx={{
                                    fontWeight: "bold",
                                    fontSize: "1rem",
                                    textTransform: "none",
                                    color: theme.palette.text.primary,
                                    "&.active": {
                                        color: theme.palette.primary.main,
                                        borderBottom: `2px solid ${theme.palette.primary.main}`,
                                    },
                                    "&:hover": {
                                        backgroundColor: theme.palette.action.hover,
                                    },
                                }}
                            >
                                {item.title}
                            </Button>
                        ))}
                        <ThemeToggle />
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Page Content */}
            <Box sx={{ mt: 4 }}>{children}</Box>
        </Container>
    );
}

export default Layout;
