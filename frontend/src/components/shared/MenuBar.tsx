import React, { useState, useEffect } from 'react'
import { AppBar, Toolbar, Button, Drawer, MenuItem } from '@material-ui/core'
import { Link } from 'react-router-dom'
import "./menuBar.scss"
// import MenuIcon from '@material-ui/icons/Menu'
import CloseIcon from '@material-ui/icons/Close'
import MenuIconWhite from '../../images/menu-circle.png'
import { ReactComponent as VALogoBeta } from '../../images/VA-Logo-White-Pink-Beta.svg'



const MenuBar = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    const toggleDrawer = (open: boolean) => event => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setIsDrawerOpen(open);
    };

    const handleScroll = () => {
        // console.log(window.pageYOffset)
        // if (window.pageYOffset > 135) {
        //     setIsShowLogo(true)
        // } else {
        //     setIsShowLogo(false)
        // }

        // if (window.pageYOffset > 440) {
        //     setIsShowCta(true)
        // } else {
        //     setIsShowCta(false)
        // }
    };

    const handleClose = () => {
        setIsDrawerOpen(false);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', () => handleScroll);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps  
    }, []);

    return (
        <>
            <div className="menu-bar">
                <AppBar>
                    <Toolbar>
                        <div className="logo-wrapper">
                            <Link to={'/'}>
                                {/* <span>VA <span className="full-stop">.</span></span> */}
                                <VALogoBeta />
                            </Link>
                        </div>
                        <div className="menu-items">
                            {/* <Link to={'/round-planner'}>
                                <span>About</span>
                            </Link> */}
                            {/* <Link to={'/round-planner'}>
                                <span>Services</span>
                            </Link>
                            <Link to={'/round-planner'}>
                                <span>Checklists</span>
                            </Link> */}
                            <Link to={'/round-planner'}>
                                {/* <div className="cta-wrapper"> */}
                                <span>Round Planner</span>
                                {/* </div> */}
                            </Link>
                        </div>
                        <div className="clickable-icon hamburger-menu" aria-controls="simple-menu" aria-haspopup="true"
                            onClick={toggleDrawer(true)}
                        >
                            {/* <MenuIcon /> */}
                            <img src={MenuIconWhite} />
                            {/* <LightningSVG style={{fill: "whie"}} /> */}
                        </div>
                    </Toolbar>
                </AppBar>

                <Drawer
                        anchor="top"
                        open={isDrawerOpen}
                        onClose={toggleDrawer(false)}
                        className="menu-drawer"
                        // classes={{
                        //     paper: classes.paper
                        // }}
                    >
                        <div className="close-icon-container">
                            <Button
                                className="clickable-icon hamburger-menu"
                                aria-controls="simple-menu"
                                aria-haspopup="true"
                                onClick={toggleDrawer(false)}
                                // style={{ color: props.auction.appConfig.menuBarFontColor }}
                            >
                                <CloseIcon />
                            </Button>
                        </div>
                        {/* <Link to={`/`}>
                            <MenuItem onClick={() => { setIsDrawerOpen(false) }}>About</MenuItem>
                        </Link> */}
                        {/* <Link to={`/`}>
                            <MenuItem onClick={() => { setIsDrawerOpen(false) }}>Services</MenuItem>
                        </Link>
                        <Link to={`/`}>
                            <MenuItem onClick={() => { setIsDrawerOpen(false) }}>Checklists</MenuItem>
                        </Link> */}
                        <Link to={`/round-planner`}>
                            <MenuItem onClick={() => { setIsDrawerOpen(false) }}>Round Planner</MenuItem>
                        </Link>
                    </Drawer>
            </div>
        </>
    )
}

export default MenuBar