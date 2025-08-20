"use client"
import { Menu as MenuIcon, Close as CloseIcon, ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon } from '@mui/icons-material';
import { AppBar, Button, IconButton, Toolbar, Typography, Drawer, List, ListItem, ListItemText, Collapse, Box, Menu, MenuItem } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useMediaQuery } from '@mui/material';
import Link from 'next/link';
import Logo from './Logo';

const navItems = [
    {
        label: "What we offer",
        link: "/offer",
        dropdown: [
            { label: "Invest", link: "/offer/invest" },
            { label: "Crypto", link: "/offer/crypto" },
            { label: "Retirement", link: "/offer/retirement" },
            { label: "Options", link: "/offer/options" },
            { label: "Futures", link: "/offer/futures" },
            { label: "Trading", link: "/offer/trading" },
            { label: "Banking", link: "/offer/banking" },
            { label: "Credit Card", link: "/offer/credit-card" },
        ],
    },
    { label: "Strategies", link: "/strategies" },
    { label: "Gold", link: "/gold" },
    { label: "Legend", link: "/legend" },
    { label: "Learn", link: "/learn" },
    { label: "Support", link: "/support" },
];

const accentColor = "rgb(204, 255, 0)"; // Example accent color (gold), replace with your accent

const Navbar: React.FC = () => {
    const isDesktop = useMediaQuery('(min-width:1200px)');
    const isTablet = useMediaQuery('(min-width:768px)');
    const isSmall = useMediaQuery('(min-width:500px)');

    // Mobile menu state
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState<{ [key: string]: boolean }>({});

    // Desktop dropdown state
    const [desktopAnchorEl, setDesktopAnchorEl] = useState<null | HTMLElement>(null);
    const [desktopDropdownOpen, setDesktopDropdownOpen] = useState<string | null>(null);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const toggleDropdown = (label: string) => {
        setDropdownOpen(prev => ({
            ...prev,
            [label]: !prev[label]
        }));
    };

    // Desktop dropdown handlers
    const handleDesktopDropdownClick = (event: React.MouseEvent<HTMLElement>, itemLabel: string) => {
        if (desktopDropdownOpen === itemLabel) {
            setDesktopAnchorEl(null);
            setDesktopDropdownOpen(null);
        } else {
            setDesktopAnchorEl(event.currentTarget);
            setDesktopDropdownOpen(itemLabel);
        }
    };

    const handleDesktopDropdownClose = () => {
        setDesktopAnchorEl(null);
        setDesktopDropdownOpen(null);
    };

    const handleNavItemClick = () => {
        setMobileMenuOpen(false);
        setDropdownOpen({});
    };

    // Close mobile menu when screen switches to desktop
    useEffect(() => {
        if (isDesktop) {
            setMobileMenuOpen(false);
            setDropdownOpen({});
        } else {
            // Close desktop dropdown when switching to mobile
            setDesktopAnchorEl(null);
            setDesktopDropdownOpen(null);
        }
    }, [isDesktop]);

    return (
        <>
            <AppBar sx={{ backgroundColor: "black", color: "white", boxShadow: "none", position: "sticky" }}>
                <Toolbar className='flex justify-between gap-8'>
                    {/* Left: Logo */}
                    <div>
                        <Typography variant="h6" sx={{ color: "white" }}>
                            <Logo />
                        </Typography>
                    </div>

                    {/* Desktop Navigation */}
                    {isDesktop && (
                        <div className='flex gap-4'>
                            {navItems.map(navItem => (
                                <div key={navItem.label}>
                                    {navItem.dropdown ? (
                                        <>
                                            <Button
                                                onClick={(e) => handleDesktopDropdownClick(e, navItem.label)}
                                                sx={{
                                                    color: "white",
                                                    textTransform: 'inherit',
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(255,255,255,0.1)'
                                                    }
                                                }}
                                            >
                                                {navItem.label}
                                                {desktopDropdownOpen === navItem.label ?
                                                    <ExpandLessIcon sx={{ ml: 0.5 }} /> :
                                                    <ExpandMoreIcon sx={{ ml: 0.5 }} />
                                                }
                                            </Button>
                                            <Menu
                                                anchorEl={desktopAnchorEl}
                                                open={desktopDropdownOpen === navItem.label}
                                                onClose={handleDesktopDropdownClose}
                                                PaperProps={{
                                                    sx: {
                                                        backgroundColor: "black",
                                                        color: "white",
                                                        '& .MuiMenuItem-root:hover': {
                                                            backgroundColor: 'rgba(255,255,255,0.1)',
                                                        },
                                                    },
                                                }}
                                            >
                                                {navItem.dropdown.map((subItem) => (
                                                    <MenuItem key={subItem.label} onClick={handleDesktopDropdownClose}>
                                                        <Link
                                                            href={subItem.link}
                                                            style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}
                                                        >
                                                            {subItem.label}
                                                        </Link>
                                                    </MenuItem>
                                                ))}
                                            </Menu>
                                        </>
                                    ) : (
                                        <Button
                                            component={Link}
                                            href={navItem.link}
                                            sx={{
                                                color: "white",
                                                textTransform: 'inherit',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(255,255,255,0.1)'
                                                }
                                            }}
                                        >
                                            {navItem.label}
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Right: Login, Signup, Hamburger */}
                    <div className="flex ml-auto gap-2 items-center">
                        {/* Login - hidden on screens < 768px */}
                        {isTablet && (
                            <Button
                                component={Link}
                                href="/login"
                                sx={{
                                    color: accentColor,
                                    borderColor: accentColor,
                                    backgroundColor: "black",
                                    border: "1px solid",
                                    textTransform: 'inherit',
                                    mx: 1,
                                    '&:hover': {
                                        backgroundColor: accentColor,
                                        color: "black",
                                    },
                                }}
                                variant="outlined"
                            >
                                Login
                            </Button>
                        )}

                        {/* Signup - hidden on screens < 500px */}
                        {isSmall && (
                            <Button
                                component={Link}
                                href="/signup"
                                sx={{
                                    color: "black",
                                    backgroundColor: accentColor,
                                    border: `1px solid ${accentColor}`,
                                    textTransform: 'inherit',
                                    mx: 1,
                                    '&:hover': {
                                        backgroundColor: "black",
                                        borderColor: accentColor,
                                        color: accentColor,
                                    },
                                }}
                                variant="contained"
                            >
                                Signup
                            </Button>
                        )}

                        {/* Hamburger Menu - only on mobile */}
                        {!isDesktop && (
                            <IconButton
                                edge="end"
                                sx={{
                                    color: "white",
                                    transition: 'transform 0.3s ease',
                                    transform: mobileMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                                }}
                                onClick={toggleMobileMenu}
                            >
                                {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
                            </IconButton>
                        )}
                    </div>
                </Toolbar>
            </AppBar>

            {/* Mobile Navigation Drawer */}
            <Drawer
                anchor="top"
                open={mobileMenuOpen}
                onClose={() => setMobileMenuOpen(false)}
                PaperProps={{
                    sx: {
                        backgroundColor: "black",
                        color: "white",
                        width: "100vw",
                        height: "100vh",
                        top: "64px", // AppBar height
                    },
                }}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile
                }}
            >
                <Box sx={{ width: "100%", height: "100%", p: 2 }}>
                    <List sx={{ width: "100%" }}>
                        {navItems.map((item) => (
                            <div key={item.label}>
                                {item.dropdown ? (
                                    <>
                                        <ListItem
                                            sx={{
                                                width: "100%",
                                                borderBottom: "1px solid rgba(255,255,255,0.1)",
                                                py: 2,
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(255,255,255,0.05)'
                                                }
                                            }}
                                            onClick={() => toggleDropdown(item.label)}
                                        >
                                            <ListItemText
                                                primary={item.label}
                                                sx={{
                                                    '& .MuiTypography-root': {
                                                        fontSize: '1.2rem',
                                                        fontWeight: 500
                                                    }
                                                }}
                                            />
                                            <ExpandMoreIcon
                                                sx={{
                                                    transform: dropdownOpen[item.label] ? 'rotate(180deg)' : 'rotate(0deg)',
                                                    transition: 'transform 0.3s ease'
                                                }}
                                            />
                                        </ListItem>
                                        <Collapse in={dropdownOpen[item.label]} timeout="auto" unmountOnExit>
                                            <List component="div" disablePadding>
                                                {item.dropdown.map((subItem) => (
                                                    <ListItem
                                                        key={subItem.label}
                                                        component={Link}
                                                        href={subItem.link}
                                                        onClick={handleNavItemClick}
                                                        sx={{
                                                            pl: 4,
                                                            py: 1.5,
                                                            width: "100%",
                                                            borderBottom: "1px solid rgba(255,255,255,0.05)",
                                                            cursor: 'pointer',
                                                            textDecoration: 'none',
                                                            color: 'inherit',
                                                            '&:hover': {
                                                                backgroundColor: 'rgba(255,255,255,0.05)'
                                                            }
                                                        }}
                                                    >
                                                        <ListItemText
                                                            primary={subItem.label}
                                                            sx={{
                                                                '& .MuiTypography-root': {
                                                                    fontSize: '1rem',
                                                                    color: 'rgba(255,255,255,0.8)'
                                                                }
                                                            }}
                                                        />
                                                    </ListItem>
                                                ))}
                                            </List>
                                        </Collapse>
                                    </>
                                ) : (
                                    <ListItem
                                        component={Link}
                                        href={item.link}
                                        onClick={handleNavItemClick}
                                        sx={{
                                            width: "100%",
                                            borderBottom: "1px solid rgba(255,255,255,0.1)",
                                            py: 2,
                                            cursor: 'pointer',
                                            textDecoration: 'none',
                                            color: 'inherit',
                                            '&:hover': {
                                                backgroundColor: 'rgba(255,255,255,0.05)'
                                            }
                                        }}
                                    >
                                        <ListItemText
                                            primary={item.label}
                                            sx={{
                                                '& .MuiTypography-root': {
                                                    fontSize: '1.2rem',
                                                    fontWeight: 500
                                                }
                                            }}
                                        />
                                    </ListItem>
                                )}
                            </div>
                        ))}

                        {/* Mobile Login/Signup Buttons */}
                        <Box sx={{ mt: 4, px: 2 }}>
                            {/* Login - show on mobile when hidden on desktop */}
                            {!isTablet && (
                                <Button
                                    component={Link}
                                    href="/login"
                                    onClick={handleNavItemClick}
                                    fullWidth
                                    sx={{
                                        color: accentColor,
                                        borderColor: accentColor,
                                        backgroundColor: "black",
                                        border: "1px solid",
                                        textTransform: 'inherit',
                                        mb: 2,
                                        py: 1.5,
                                        fontSize: '1.1rem',
                                        '&:hover': {
                                            backgroundColor: accentColor,
                                            color: "black",
                                        },
                                    }}
                                    variant="outlined"
                                >
                                    Login
                                </Button>
                            )}

                            {/* Signup - show on mobile when hidden on desktop */}
                            {!isSmall && (
                                <Button
                                    component={Link}
                                    href="/signup"
                                    onClick={handleNavItemClick}
                                    fullWidth
                                    sx={{
                                        color: "black",
                                        backgroundColor: accentColor,
                                        border: `1px solid ${accentColor}`,
                                        textTransform: 'inherit',
                                        py: 1.5,
                                        fontSize: '1.1rem',
                                        '&:hover': {
                                            backgroundColor: "black",
                                            borderColor: accentColor,
                                            color: accentColor,
                                        },
                                    }}
                                    variant="contained"
                                >
                                    Signup
                                </Button>
                            )}
                        </Box>
                    </List>
                </Box>
            </Drawer>
        </>
    );
};

export default Navbar;