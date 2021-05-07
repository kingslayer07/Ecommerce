import React from 'react';
import {Grid} from '@material-ui/core';
import Product from './Product/Product' ;
import useStyles from './styles'

// const products = [
//     { id: 1, name: 'Watch', description: 'Apple WAtch' , price: '$20', img:'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/apple-watch-6s-202009?wid=1200&hei=630&fmt=jpeg&qlt=95&.v=1599936770000'},
//     { id: 2, name: 'Shoes', description: 'Nike WAtch' , price: '$20', img: 'https://static.nike.com/a/images/w_1536,c_limit/9de44154-c8c3-4f77-b47e-d992b7b96379/image.jpg'},
// ]
const Products = ({products} ) => {
    const classes = useStyles()
    return(<main className={classes.content}>
    <div className={classes.toolbar}></div>
        <Grid container justify='center' spacing={4}>
            {products.map((product)=>{
                return <Grid item key={products.id} xs={12} sm={6} md={4} lg ={3} >
                    <Product product = {product}></Product>
                </Grid>
            })}
        </Grid>
    </main>)
}

export default Products;