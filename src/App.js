import React, { useEffect , useState} from 'react'
import {commerce, commerec} from './lib/commerce'
import {Products, Navbar } from './Components';
function App()  {
    const [products, setProducts] = useState([])
    const fetchProducts = async () =>{
        const {data} = await commerce.products.list()
        setProducts(data)
    }
     useEffect(() =>{
         fetchProducts()
     },[])
     console.log(products)
    return (
        <div>
        <Navbar></Navbar>
            <Products products= {products}></Products>
        </div>
    )
}

export default App;