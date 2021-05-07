import React from 'react'
import {AppBar, Toolbar, IconButton, Badge, MenuIcon, Menu, Typography} from '@material-ui/core'
import {ShoppingCart } from '@material-ui/icons'
import logo from '../../assets/shop.jpg'
import useStyles from './styles'
const Navbar = () => {
    const classes = useStyles()
    return (
       <>
        <AppBar position='fixed' className={classes.appBar} color='inherit'>
            <Toolbar >
                <Typography  variant='h6' className={classes.title} color='inherit'>
                    <img src={logo} alt="CommerceX" height='25px' className={classes.image} />
                    CommerceX
                </Typography>
                <div className={classes.grow}></div>
                <div className={classes.button}>
                    <IconButton aria-label='Show cart icons' color='inherit'>
                        <Badge badgeContent={2} color='secondary'>
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                </div>
            </Toolbar>
        </AppBar>
       </>
       
    )
}

export default Navbar
