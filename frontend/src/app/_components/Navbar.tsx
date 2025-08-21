"use client";

import React, { useState, useEffect } from 'react';
import { useMediaQuery } from '@mui/material';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Collapse,
    Box,
} from '@mui/material';
import {
    Menu as MenuIcon,
    Close as CloseIcon,
    ExpandMore as ExpandMoreIcon,
    ExpandLess as ExpandLessIcon,
} from '@mui/icons-material';
import Link from 'next/link';
import Logo from './Logo';
import { COLORS, BREAKPOINTS, buttonStyles, menuStyles } from '../styles/theme';

// Navigation data
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

// Types
interface NavItem {
    label: string;
    link: string;
    dropdown?: { label: string; link: string }[];
}

interface NavButtonProps {
    item: NavItem;
    isDesktop: boolean;
    desktopDropdownOpen: string | null;
    onDesktopDropdownClick: (event: React.MouseEvent<HTMLElement>, itemLabel: string) => void;
    desktopAnchorEl: HTMLElement | null;
    onDesktopDropdownClose: () => void;
}

interface AuthButtonsProps {
    isTablet: boolean;
    isSmall: boolean;
    isMobile?: boolean;
    onNavClick?: () => void;
}

// Components
const NavButton: React.FC<NavButtonProps> = ({
    item,
    isDesktop,
    desktopDropdownOpen,
    onDesktopDropdownClick,
    desktopAnchorEl,
    onDesktopDropdownClose,
}) => {
    if (item.dropdown && isDesktop) {
        return (
            <>
                <Button
                    onClick={(e) => onDesktopDropdownClick(e, item.label)}
                    sx={buttonStyles.base}
                >
                    {item.label}
                    {desktopDropdownOpen === item.label ?
                        <ExpandLessIcon sx={{ ml: 0.5 }} /> :
                        <ExpandMoreIcon sx={{ ml: 0.5 }} />
                    }
                </Button>
                <Menu
                    anchorEl={desktopAnchorEl}
                    open={desktopDropdownOpen === item.label}
                    onClose={onDesktopDropdownClose}
                    PaperProps={{ sx: menuStyles.paper }}
                >
                    {item.dropdown.map((subItem) => (
                        <MenuItem key={subItem.label} onClick={onDesktopDropdownClose}>
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
        );
    }

    return (
        <Button
            component={Link}
            href={item.link}
            sx={buttonStyles.base}
        >
            {item.label}
        </Button>
    );
};

const AuthButtons: React.FC<AuthButtonsProps> = ({ isTablet, isSmall, isMobile, onNavClick }) => {
    const loginStyles = isMobile ?
        { ...buttonStyles.login, mb: 2, py: 1.5, fontSize: '1.1rem' } :
        buttonStyles.login;

    const signupStyles = isMobile ?
        { ...buttonStyles.signup, py: 1.5, fontSize: '1.1rem' } :
        buttonStyles.signup;

    return (
        <>
            {((isMobile && !isTablet) || (!isMobile && isTablet)) && (
                <Button
                    component={Link}
                    href="/login"
                    onClick={onNavClick}
                    fullWidth={isMobile}
                    sx={loginStyles}
                    variant="outlined"
                >
                    Login
                </Button>
            )}

            {((isMobile && !isSmall) || (!isMobile && isSmall)) && (
                <Button
                    component={Link}
                    href="/signup"
                    onClick={onNavClick}
                    fullWidth={isMobile}
                    sx={signupStyles}
                    variant="contained"
                >
                    Signup
                </Button>
            )}
        </>
    );
};

const Navbar: React.FC = () => {
    // Media queries
    const isDesktop = useMediaQuery(BREAKPOINTS.DESKTOP);
    const isTablet = useMediaQuery(BREAKPOINTS.TABLET);
    const isSmall = useMediaQuery(BREAKPOINTS.SMALL);

    // State
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState<Record<string, boolean>>({});
    const [desktopAnchorEl, setDesktopAnchorEl] = useState<HTMLElement | null>(null);
    const [desktopDropdownOpen, setDesktopDropdownOpen] = useState<string | null>(null);

    // Handlers
    const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

    const toggleDropdown = (label: string) => {
        setDropdownOpen(prev => ({ ...prev, [label]: !prev[label] }));
    };

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

    // Effects
    useEffect(() => {
        if (isDesktop) {
            setMobileMenuOpen(false);
            setDropdownOpen({});
        } else {
            setDesktopAnchorEl(null);
            setDesktopDropdownOpen(null);
        }
    }, [isDesktop]);

    return (
        <>
            <AppBar sx={{ backgroundColor: COLORS.BLACK, color: COLORS.WHITE, boxShadow: "none", position: "sticky" }}>
                <Toolbar className='flex justify-between gap-8'>
                    {/* Logo */}
                    <Typography variant="h6" sx={{ color: COLORS.WHITE }}>
                        <Logo />
                    </Typography>

                    {/* Desktop Navigation */}
                    {isDesktop && (
                        <div className='flex gap-4'>
                            {navItems.map(item => (
                                <div key={item.label}>
                                    <NavButton
                                        item={item}
                                        isDesktop={isDesktop}
                                        desktopDropdownOpen={desktopDropdownOpen}
                                        onDesktopDropdownClick={handleDesktopDropdownClick}
                                        desktopAnchorEl={desktopAnchorEl}
                                        onDesktopDropdownClose={handleDesktopDropdownClose}
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Right side */}
                    <div className="flex ml-auto gap-2 items-center">
                        <AuthButtons isTablet={isTablet} isSmall={isSmall} />

                        {!isDesktop && (
                            <IconButton
                                edge="end"
                                sx={{
                                    color: COLORS.WHITE,
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

            {/* Mobile Navigation */}
            <Drawer
                anchor="top"
                open={mobileMenuOpen}
                onClose={() => setMobileMenuOpen(false)}
                PaperProps={{ sx: menuStyles.drawer }}
                ModalProps={{ keepMounted: true }}
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
                                                '&:hover': { backgroundColor: COLORS.HOVER }
                                            }}
                                            onClick={() => toggleDropdown(item.label)}
                                        >
                                            <ListItemText
                                                primary={item.label}
                                                sx={{ '& .MuiTypography-root': { fontSize: '1.2rem', fontWeight: 500 } }}
                                            />
                                            {dropdownOpen[item.label] ?
                                                <ExpandLessIcon sx={{ transition: 'transform 0.3s ease' }} /> :
                                                <ExpandMoreIcon sx={{ transition: 'transform 0.3s ease' }} />
                                            }
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
                                                            '&:hover': { backgroundColor: COLORS.HOVER }
                                                        }}
                                                    >
                                                        <ListItemText
                                                            primary={subItem.label}
                                                            sx={{ '& .MuiTypography-root': { fontSize: '1rem', color: 'rgba(255,255,255,0.8)' } }}
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
                                            '&:hover': { backgroundColor: COLORS.HOVER }
                                        }}
                                    >
                                        <ListItemText
                                            primary={item.label}
                                            sx={{ '& .MuiTypography-root': { fontSize: '1.2rem', fontWeight: 500 } }}
                                        />
                                    </ListItem>
                                )}
                            </div>
                        ))}

                        {/* Mobile Auth Buttons */}
                        <Box sx={{ mt: 4, px: 2 }}>
                            <AuthButtons
                                isTablet={isTablet}
                                isSmall={isSmall}
                                isMobile
                                onNavClick={handleNavItemClick}
                            />
                        </Box>
                    </List>
                </Box>
            </Drawer>
        </>
    );
};

export default Navbar;
