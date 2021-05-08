import React, { useEffect , useState} from 'react'
import {commerce, commerec} from './lib/commerce'
import {Products, Navbar, Cart } from './Components';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
function App()  {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState({})

    const fetchProducts = async () =>{
        const {data} = await commerce.products.list()
        setProducts(data)
    }
    const fetchCart =async () =>{
       return (setCart(await commerce.cart.retrieve()))
    }
    const handleAddToCart = async (productId, quantity) =>{
        const  cart = await commerce.cart.add(productId, quantity)
        setCart(cart)
    }
    const handleUpdateCartQty = async (productId, quantity) =>{
        const {cart} = await commerce.cart.update(productId, {quantity})
        setCart(cart)
    }
    const handleRemoveFromCart = async ( productId) => {
        const {cart} = await commerce.cart.remove(productId)
        setCart(cart)
    }
    const handleEmptyCart = async () =>{
        setCart(await commerce.cart.empty())

    }


     useEffect(() =>{
         fetchProducts()
         fetchCart()
     },[])
    //  console.log(products)
     console.log(cart)
    return (
        <Router>

        <div>
        <Navbar totalItems = {cart.total_items}></Navbar>
        <Switch>
            <Route exact path='/'>
            <Products products= {products} onAddToCart = {handleAddToCart}></Products>
            </Route>
            <Route path='/cart'>
            <Cart 
                cart={cart}
                handleUpdateCartQty = {handleUpdateCartQty}
                handleRemoveFromCart = {handleRemoveFromCart}
                handleEmptyCart = {handleEmptyCart}
                ></Cart>

            </Route>
        </Switch>
        </div>
        </Router>
    )
}

export default App;