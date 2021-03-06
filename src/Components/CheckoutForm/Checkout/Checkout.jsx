import React, {useState, useEffect} from 'react'
import {Paper, Stepper, Step, StepLabel, Typography,CssBaseline, CircularProgress, Divider, Button} from '@material-ui/core'
import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'
import useStyles from './styles'
import {commerce} from '../../../lib/commerce' 
import {Link, useHistory} from 'react-router-dom' 

const steps =['Shipping address', 'Payment details']

let Checkout = ({cart, order, onCaptureCheckout, error}) => {
    const classes = useStyles()
    const [checkoutToken, setCheckoutToken] = useState(null)
    const [activeStep, setActiveStep] = useState(0)
    const [shippingData, setShippingData] = useState({})
    const history = useHistory()
    useEffect(() =>{
        const generateToken = async () =>{
            try {
                const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'})
                setCheckoutToken(token)
                // console.log(checkoutToken)
            } catch (error) {
                history.pushState('/')
            }
        }
        generateToken()
    },[cart])

    const nextStep = () => setActiveStep((previousStep) => previousStep +1)
    const backStep = () => setActiveStep((previousStep) => previousStep -1)

    const next = (data) =>{
        setShippingData(data)
        nextStep()
    }
        const Confirmation =() => {
            console.log(order)
           return (
                <>
             <div>
                 <Typography variant='h5' >Thank You for your purchase</Typography>
                 <Divider className={classes.divider}></Divider>

             </div>
             <br />
            <Button component={Link} to = '/' variant='outlined' type='button'>Back to Home</Button>
         </>
           )
        }

    // const Confirmation =() => order.customer ? (
    //      <>
    //         <div>
    //             <Typography variant='h5' >Thank You for your purchase, {order.customer.firstname} {order.customer.lastname} </Typography>
    //             <Divider className={classes.divider}></Divider>
    //             <Typography variant ='subtitle2'>Order ref: {order.customer_reference}</Typography>

    //         </div>
    //         <br />
    //         <Button component={Link} to = '/' variant='outlined' type='button'>Back to Home</Button>
    //     </>
    // ) 
    // : (
    //     <div className = {classes.spinner}>
    //         <CircularProgress />
    //         {console.log(error)}
    //         <Typography variant='h5' >Error: {error}</Typography>
    //     </div>
    // )

    if(error){
        <>
            <Typography variant='h5' >Error: {error}</Typography>
            <Button component={Link} to = '/' variant='outlined' type='button'>Back to Home</Button>

        </>
    }
    
    const Form = () => activeStep === 0
        ? <AddressForm checkoutToken={checkoutToken} next={next}/>
         : <PaymentForm shippingData={shippingData} nextStep={nextStep} onCaptureCheckout={onCaptureCheckout} checkoutToken={checkoutToken} backStep={backStep} />
    

    return (
        <>
        <CssBaseline></CssBaseline>
            <div className={classes.toolbar}></div>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant='h4' align='center'>Checkout</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((step) => (
                            <Step key ={step}>
                            <StepLabel> {step}</StepLabel>

                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
                </Paper>
            </main>
        </>
    )
}

export default Checkout
