import React from 'react'
import {Container, Typography, Button, Grid} from '@material-ui/core'
import useStyles from './styles'
import CartItem from './CartItem/CartItem'
import {Link} from 'react-router-dom'
const Cart = ({cart, handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart}) => {
    const classes =useStyles()
    // const isEmpty = !cart.line_items.length
    const EmptyCart = () =>{

       return  <Typography  variant='subtitle1'>No items in your cart, still confused ?
                    <Link className={classes.link} to='/'>start adding some </Link>
        </Typography>

    }
    const FilledCart = () =>{
        return <>
            <Grid container spacing = {3}>
                {cart.line_items.map((item) =>{
                    return (
                        <Grid item xs={12} sm ={4} key = {item.id}>
                           <CartItem item = {item} onUpdateCartQty = {handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart}> </CartItem>
                        </Grid>
                    )
                })}
            </Grid>
            <div className={classes.cardDetails }>
                <Typography variant='h5'>Subtotal: {cart.subtotal.formatted_with_symbol}</Typography>
                <div>
                    <Button
                         className={classes.emptyButton}
                         size='large' type='button'
                         variant='contained'
                         color='secondary'
                         onClick={handleEmptyCart}>Empty cart</Button>
                    <Button 
                        className={classes.checkoutButton} 
                        size='large' 
                        type='button' 
                        variant='contained' 
                        color='primary' component={Link} to='/checkout'>Checkout</Button>

                </div>
            </div>
        </>
    }  
    if(!cart.line_items) return 'Loading...'
    return (
        <Container >
            <div className={classes.toolbar}></div>
            <Typography className={classes.title} variant='h4' gutterBottom>Your Shopping Cart</Typography>
            {!cart.line_items.length ? <EmptyCart /> : < FilledCart/>}
        </Container>       
        
    )
}

export default Cart
