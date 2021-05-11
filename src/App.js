import React, { useEffect , useState} from 'react'
import {commerce} from './lib/commerce'
import {Products, Navbar, Cart, Checkout } from './Components';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
function App()  {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState({})
    const [order, setOrder] = useState({})
    const [errorMessage, setErrorMessage] = useState('')

    const fetchProducts = async () =>{
        const {data} = await commerce.products.list()
      return  (setProducts(data))
    }
    const fetchCart =async () =>{
       return (setCart(await commerce.cart.retrieve()))
    }
    const handleAddToCart = async (productId, quantity) =>{
        const  item = await commerce.cart.add(productId, quantity)
     return   (setCart(item.cart))
    }
    const handleUpdateCartQty = async (productId, quantity) =>{
        const response = await commerce.cart.update(productId, {quantity})
      return  (setCart(response.cart))
    }
    const handleRemoveFromCart = async ( productId) => {
        const response = await commerce.cart.remove(productId)
        return    (setCart(response.cart))
    }
    const handleEmptyCart = async () =>{
          const response = await commerce.cart.empty();

           return     setCart(response.cart);

    }

    const refreshCart = async () =>{
        const newCart = await commerce.cart.refresh()
        return (setCart(newCart))
    }

    const handleCaptureCheckout =async (CheckoutTokenId, newOrder) =>{
        try {
            const incomingOrder = await commerce.checkout.capture(CheckoutTokenId,newOrder )
            console.log(incomingOrder)
            setOrder(incomingOrder)

            refreshCart()
        } catch (error) {
            setErrorMessage(error.data.error.message)   
        } return
    }

     useEffect(() =>{
         fetchProducts()
         fetchCart()
     },[])
    //  console.log(products)
    //  console.log(cart)
    return (
        <Router>

        <div style={{display: 'flex'}}>
        <Navbar totalItems = {cart.total_items}></Navbar>
        <Switch>
            <Route exact path='/'>
            <Products products= {products} onAddToCart = {handleAddToCart}></Products>
            </Route>
            <Route exact path='/cart'>
            <Cart 
                cart={cart}
                handleUpdateCartQty = {handleUpdateCartQty}
                handleRemoveFromCart = {handleRemoveFromCart}
                onEmptyCart = {handleEmptyCart}
                ></Cart>
            </Route>
            <Route exact path='/checkout'>
                <Checkout 
                    cart={cart}
                    order={order}
                    onCaptureCheckout ={handleCaptureCheckout}
                    error={errorMessage}
                 />
            </Route>
        </Switch>
        </div>
        </Router>
    )
}

export default App;